const { JSDOM } = require("jsdom");

module.exports = html => {
  return new Promise((resolve, reject) => {
    try {
      const { window } = new JSDOM(html);
      const { document } = window;
      const description = document.querySelector("meta[name='description']");
      resolve({
        title: document.title,
        description: description.content
      });
    } catch (err) {
      reject(err);
    }
  });
};
