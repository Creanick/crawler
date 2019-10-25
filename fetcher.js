const axios = require("axios");
module.exports = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(result => {
        if (result.headers["content-type"].split(";")[0] !== "text/html") {
          reject(new Error("no html content"));
          return;
        }
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
