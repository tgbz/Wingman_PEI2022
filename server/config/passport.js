var LocalStrategy = require('passport-local').Strategy;
var JWTstrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var secretKey = require('../config/app');
var Users = require('../controllers/users');
var bcrypt = require('bcryptjs')

module.exports = function (passport) { 
    passport.use('login', new LocalStrategy(
        function (email, password, done) { 
            Users.getOne(email)
            .then(user =>{
                if (user==null) {
                    return done(null, false, { message: 'Ocorreu um erro ao realizar o login! Por favor verifique as suas credenciais.' });
                }

                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if(err) done(err);
                    if (isMatch) {
                        return done(null, user, { message: 'Login efetuado com sucesso.' });
                    } else {
                        return done(null, false, { message: 'Ocorreu um erro ao realizar o login! Por favor verifique as suas credenciais.' });
                    }
                })

            })
            .catch(err =>{
                done(err);
            })
            /*
            Users.getOne(email, function (err, user) {
                if (err) done(err);
                if (!user) {
                    return done(null, false, { message: 'Ocorreu um erro ao realizar o login! Por favor verifique as suas credenciais.' });
                }

                Users.comparePassword( password , user.password, function (err, isMatch) {
                    if (err) done(err);
                    if (isMatch) {
                        return done(null, user, { message: 'Login efetuado com sucesso.' });
                    } else {
                        return done(null, false, { message: 'Ocorreu um erro ao realizar o login! Por favor verifique as suas credenciais.' });
                    }
                });
            });*/
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.idUser);
    });

    passport.deserializeUser(function (id, done) {
        Users.getUserById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use("jwt", new JWTstrategy({
        secretOrKey: secretKey.userPublicKey,
        algorithms: ["RS256"],
        jwtFromRequest: ExtractJWT.fromExtractors([
            ExtractJWT.fromUrlQueryParameter('token'),
            ExtractJWT.fromAuthHeaderWithScheme('Bearer')
        ])
    }, async (token, done) => {
        done(null, token);
    }))
};
