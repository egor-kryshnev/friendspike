var configValues = require("./config");

module.exports = {
  getDbConnectionString: function() {
    // mongodb://127.0.0.1:27017/test
    return "mongodb://localhost:27017/test1";
  }
};

