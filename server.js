var express = require("express");
var app = express();
const helmet = require("helmet");
var http = require("http").Server(app);
var mongoose = require("mongoose");
var config = require("./configDB");
var router = require("./router");
const hsts = require("hsts");
// var tunnel = require("tunnel-ssh");
var bodyParser = require("body-parser");
var port = process.env.PORT || 3003;
const path = require("path");
// var spikeAPI = require("./spikeKartoffel");
const { getSpikeAuthMiddleWare } = require("spike-auth-middleware");


class Server {
  constructor() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const configuration = {
      audience: "_x8XM2ydp3WOE_H6t3Ox4Mc9_55waX",
      allowedScopes: ["read", "write"],
      pathToPublicKey: path.resolve(__dirname, './publickey.pem'),
      useBearerToken: false
    }

    const allowForReadScopeOnly = getSpikeAuthMiddleWare(configuration);

    this.app = express();
    this.app.listen(port, function() {
      console.log("Server listening on port: " + port);
    });
    this.app.use(allowForReadScopeOnly);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.frameguard());
    this.app.use(
      hsts({
        maxAge: 15552000 // 180 days in seconds
      })
    );
    this.app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.header("access-Control-Allow-Origin", "*");
      next();
    });
    // spike();
    // spikeAPI();

    router(this.app);

    
    mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true  });
  }
}

module.exports.Server = Server;
const server = new Server();
