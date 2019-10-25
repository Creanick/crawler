const axios = require("axios");
module.exports = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
