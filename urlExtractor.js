const { JSDOM } = require("jsdom");
const { getAbsoluteUrl } = require("./urlFormatter");
module.exports = (html, url) => {
  return new Promise((resolve, reject) => {
    try {
      const { window } = new JSDOM(html);
      const { document } = window;

      const anchorTag = document.querySelectorAll("a");
      const urls = Array.prototype.map.call(anchorTag, tag => {
        if (url) {
          return getAbsoluteUrl(tag.href, url);
        }
        return tag.href;
      });
      resolve(urls);
    } catch (err) {
      reject(err);
    }
  });
};
