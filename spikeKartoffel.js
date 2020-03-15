const axios = require('axios');
const https = require('https');
const fs = require('fs');
const getTokenCreator = require("spike-get-token");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var options = {
    redisHost: 'redis://localhost:6379',
    ClientId: 'jCvB5Y32nhnWDySq1Os8C~WZEp~Ig3erDcQIoLyl',
    ClientSecret: 'qpzH5ThOQlvfqr7e2Infv9s0iLC8FTzWjWQ2EH8EOmMszllwVtxeVTVImGh0of65nxrXUsf4cW55fgtCFthEmweKCqrqnTXVn9E9',
    spikeURL: 'https://51.144.178.121:1337/oauth2/token',
    tokenGrantType: 'client_credentials',
    tokenAudience: 'kartoffel',
    tokenRedisKeyName: 'token_spike_kartoffel',
    spikePublicKeyFullPath: './publickey.pem',
    useRedis: true
};
const getToken = getTokenCreator(options);

// console.log(Buffer.from(ClientId + ":" + ClientSecret).toString('base64'));
module.exports = getToken;

