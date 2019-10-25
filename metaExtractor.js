const { JSDOM } = require("jsdom");

module.exports = html => {
  return new Promise((resolve, reject) => {
    try {
      const { window } = new JSDOM(html);
      const { document } = window;
      const description = document.querySelector("meta[name='description']");
      const metaData = {
        title: document.title
      };
      if (description && description.content) {
        metaData["description"] = description.content;
      }
      resolve(metaData);
    } catch (err) {
      reject(err);
    }
  });
};
