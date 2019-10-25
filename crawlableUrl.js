const { getBaseUrl } = require("./urlFormatter");
const crawlableUrl = [];
const storeCrawlableUrl = (urls, crawledUrls) => {
  urls.forEach(fullUrl => {
    const baseUrl = getBaseUrl(fullUrl);
    const isBaseUrlExist = !!crawledUrls[baseUrl];
    if (!isBaseUrlExist) {
      crawlableUrl.push(fullUrl);
      return;
    }
    if (!crawledUrls[baseUrl].includes(fullUrl)) {
      crawlableUrl.push(fullUrl);
    }
  });
};
module.exports = {
  crawlableUrl,
  storeCrawlableUrl
};
