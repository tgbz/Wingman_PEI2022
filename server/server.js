var express = require('express');
var app = express();

//body parser for post requests
var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    limit : '50mb',
    // to support URL-encoded bodies
    extended: true,
    parameterLimit:50000
}));

var cors = require('cors')
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'Content-Type', 'DNT', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'User-Agent', 'X-Requested-With', 'Content-Length']
}
app.use(cors(corsOpts))
app.options('*', cors(corsOpts))

//helmet (sets various HTTP headers to help protect the app)
var helmet = require('helmet')
app.use(helmet({
    //HSTS recommended config
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'none'"]
        }
    }
}))


