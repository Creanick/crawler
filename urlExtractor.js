const { JSDOM } = require("jsdom");
module.exports = html => {
  return new Promise((resolve, reject) => {
    try {
      const { window } = new JSDOM(html);
      const { document } = window;

      const anchorTag = document.querySelectorAll("a");
      const urls = Array.prototype.map.call(anchorTag, tag => {
        return tag.href;
      });
      resolve(urls);
    } catch (err) {
      reject(err);
    }
  });
};
