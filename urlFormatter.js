const { URL } = require("url");
module.exports = {
  getBaseUrl: mainUrl => {
    const url = new URL(mainUrl);
    return url.origin;
  },
  getTrimmedUrl: (mainUrl, baseUrl) => {
    const url = new URL(mainUrl, baseUrl);
    return url.origin + url.pathname;
  }
};
