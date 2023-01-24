var Auth = module.exports;
var passport = require("passport");
var ExtractJWT = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var secretKey = require('../config/app');
var Parameters = require('../config/parameters')


Auth.generateTokenUser = function (user) {
    const userExpires = Parameters.getParameter('userExpires').valor
    var token = jwt.sign({
            id: user._id, 
            level: user.level, 
            email: user.email, 
            employee: user.employee
        }, 
            secretKey.userPrivateKey, 
        {
            expiresIn: userExpires, 
            algorithm: 'RS256'
    });

    return token
}

Auth.verifyTokenUser = function (key, callback) {
    return jwt.verify(key, secretKey.userPublicKey, { algorithms: ['RS256'] }, callback)
}

//Verifica se um utilizador (token) está autenticado
Auth.isLoggedInUser = function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function(err, user, info) {
        if (err) { return res.status(401).send("Unauthorized") }
        if (!user) { return res.status(401).send("Unauthorized") }
        
        if(user && user.level.includes(-1))
            return res.status(401).send("Utilizador desativado")

        req.logIn(user, function(err) {
            if (err) { return res.status(401).send("Unauthorized") }

            res.locals.id = req.user.id
            res.locals.idType = "User"
            next()
        })
    })(req, res, next)
}
/*
router.put('/:id/deactivate', Auth.isLoggedInUser, Auth.checkLevel(5,6), async (req,res) => {
    Users.deactivate({ _id: mongoose.Types.ObjectId(req.params.id)}, (err, user) => {
      if (err)
        res.status(500).send("Não foi possível desativar o utilizador!")
      if (!user)
        res.status(500).send("Utilizador já se encontrava desativado!")
      else 
        res.send("Utilizador desativado com sucesso!")
    })
  })*/