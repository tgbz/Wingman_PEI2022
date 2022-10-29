const passport = require("passport");
const connection = require("./database");

const customFields = {
    emailField: 'email',
    passwordField: 'password'
};

const verifyCallback = (email, password, done) => {
        
        connection.query("SELECT * FROM users WHERE email = ? ", [email], function (err, results, fields) {
            if (err) console.log(err);
            if (results.length == 0) {
                return done(null, false);
            }
            const isValid = validPassword(password, results[0].hash, results[0].salt);
            user={id:results[0].id, email:results[0].email, hash:results[0].hash, salt:results[0].salt};
            if (isValid) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user.id);
});


passport.deserializeUser(function(userId, done) {
    console.log("deserializeUser");
    connection.query("SELECT * FROM users WHERE id = ? ", [userId], function (err, results) {
        done(null, results[0]);
    });
});

/* Middleware  */

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString(`hex`);
    return hash === hashVerify;
}

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString(`hex`);

    return {
        salt: salt,
        hash: genHash
    };
}

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/notAuthorized');
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin == 1) {
        return next();
    }
    res.redirect('/notAuthorizedAdmin');
}


function userExists(req, res, next) {
    connection.query("SELECT * FROM users WHERE email = ? ", [req.body.email], function (err, results, fields) {
        if (err) console.log(err);
        if (results.length == 0) {
            return next();
        }
        else {
            res.redirect('/userExists');
        }
    });
}
