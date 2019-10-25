const { EventEmitter } = require("events");
const fetcher = require("./fetcher");
const metaExtractor = require("./metaExtractor");
const { crawledUrls, storeCrawledUrls } = require("./crawledUrl");
const { crawlableUrl, storeCrawlableUrl } = require("./crawlableUrl");
const urlExtractor = require("./urlExtractor");
const { getBaseUrl } = require("./urlFormatter");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const event = new EventEmitter();
const storeData = [];
let noOfUrlFetched = 0;
const urlLimit = 20;

event.on("complete", () => {
  fs.writeFile(
    path.join(__dirname, "site-data.json"),
    JSON.stringify(storeData),
    err => {
      if (err) {
        console.log("file creation is failed");
      } else {
        console.log("Crawling completed , see: site-data.json file for data");
      }

      process.exit();
    }
  );
});
event.on("new-url-added", () => {
  while (crawlableUrl.length > 0) {
    if (noOfUrlFetched >= urlLimit) {
      event.emit("complete");
      event.removeAllListeners();
      break;
    }
    event.emit("crawl", crawlableUrl.pop());
  }
});
event.on("crawl", url => {
  if (noOfUrlFetched >= urlLimit) {
    event.emit("complete");
    event.removeAllListeners();
    return;
  }
  fetcher(url)
    .then(html => {
      noOfUrlFetched++;
      storeCrawledUrls(url);
      metaExtractor(html)
        .then(data => storeData.push({ url, ...data }))
        .catch(err => console.log("meta extractor error"));
      urlExtractor(html, getBaseUrl(url))
        .then(urls => {
          storeCrawlableUrl(urls, crawledUrls);
          event.emit("new-url-added");
        })
        .catch(err => console.log("url extractor error"));
    })
    .catch(err => {
      if (noOfUrlFetched === 0) {
        console.log("Seed Url is invalid");
        event.removeAllListeners();
        process.exit();
      }
    });
});

const seedUrl = "https://github.com/jsdom/jsdom";
console.log("crawling urls...");
event.emit("crawl", seedUrl);
