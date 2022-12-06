var express = require('express');
var app = express();
//body parser for post requests
var bodyParser = require('body-parser')
var cors = require('cors')
//helmet (sets various HTTP headers to help protect the app)
var helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var dataBases = require('./config/database');

//const MySQLStore = require('express-mysql-session')(session);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(helmet({
    //HSTS recommended config
    crossOriginResourcePolicy: false,
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

const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Accept', 'Authorization', 'Cache-Control', 'Content-Type', 'DNT', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'User-Agent', 'X-Requested-With', 'Content-Length']
}
app.use(cors(corsOpts))
app.options('*', cors(corsOpts))




var passport = require('passport');
require('./config/passport')(passport);



//Inicializar o passport cada vez que uma rota é chamada
app.use(passport.initialize());



/* Middleware responsável por realizar o parsing dos bodys de pedidos num middlware antes de os gerirmos */

app.use(bodyParser.json({limit: '50mb'}));         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    limit : '50mb',
    // to support URL-encoded bodies
    extended: true,
    parameterLimit:50000
}));

/* É usado para servir ficheiros estáticos que se encontram na pasta public (css, imgs) */
app.use(express.static('public'))

/* Para definir que estamos a usar ejs com o nosso view engine.  */
app.set("view engine", "pug");

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/purchases', require('./routes/purchases'));
app.use('/categories', require('./routes/categories'));
app.use('/files', require('./routes/files'));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports = app;
