var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../controllers/users');
var Auth = require("../controllers/auth.js");
 

//LOGIN
router.post("/login", (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err)
        {console.log(err)
          res.status(500).send("De momento não é possível processar a autenticação!")
        }
      if(!user) 
        res.status(401).send("Credenciais inválidas!")
      else {
        req.login(user, () => {
          var token = Auth.generateTokenUser(user);
  
          res.send({
            token: token,
            id: user.idUser,
            name: user.name,
            email: user.email,
            level: user.level,
          })
        })
      }
    })(req, res, next);
  })
  

router.get("/login", function(req, res) {
    res.render('login-form');
});


//Register POST


 router.post("/register", function(req, res){
  console.log(req.body)
      Users.register(req.body)
      .then(id=>{
        console.log("Registo bem sucedio")
        res.redirect("/login");
      })
      .catch(err=>{
        console.log("error ocurred",err);
        res.send({
          "code":400,
          "failed":err
      })
      })
});

router.get("/register", function(req, res) {
  res.render('registo-form');
});


module.exports = router;