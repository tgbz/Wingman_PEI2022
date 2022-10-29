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

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var dataBases = require('./config/database');


app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());


var passport = require('passport');
const { application } = require('express');
require('./config/passport')(passport);

//DB CONNECTION



// Routes
app.use('/', require('./routes/index'));





app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send(`${err.message}`);
    
});

module.exports = app;
