const { getBaseUrl } = require("./urlFormatter");
const crawledUrls = {};

const storeCrawledUrls = url => {
  const baseUrl = getBaseUrl(url);
  if (crawledUrls[baseUrl]) {
    if (!crawledUrls[baseUrl].includes(url)) {
      crawledUrls[baseUrl].push(url);
    }
    return;
  }
  crawledUrls[baseUrl] = [url];
};

module.exports = {
  crawledUrls,
  storeCrawledUrls
};
