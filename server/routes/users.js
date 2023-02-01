var express = require("express");
var router = express.Router();
var passport = require("passport");
var Users = require("../controllers/users");
var Auth = require("../controllers/auth.js");

//LOGIN
router.post("/login", (req, res, next) => {
  console.log(req.body)
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send("De momento não é possível processar a autenticação!");
    }
    if (!user) res.status(401).send("Credenciais inválidas!");
    else {
      req.login(user, () => {
        var token = Auth.generateTokenUser(user);

        res.send({
          token: token,
          id: user.idUser,
          name: user.name,
          email: user.email,
          birthdate: user.birthDate,
          gender: user.gender,
          hascategory: user.hascategory
        });
      });
    }
  })(req, res, next);
});

router.get("/login", function (req, res) {
  res.render("login-form");
});


//Register POST

router.post("/register", function (req, res) {

  Users.register(req.body)
    .then((id) => {
      console.log("Registo bem sucedio");
      res.jsonp(id)
    })
    .catch((err) => {
      console.log("error ocurred", err);
      res.status(500).jsonp(err)
    });
});

router.get("/register", function (req, res) {
  res.render("registo-form");
});

router.get("/userProfile/:id", function (req, res){
  console.log(req.body)
  Users.getUser(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.put("/userProfile/:id", function (req, res){
  console.log(req.params.id,req.body)
  Users.updateUser(req.params.id,req.body)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.put("/updatePassword/:id", function (req, res){
  console.log(req.body)
  Users.updatePassword(req.params.id,req.body.password,req.body.newpassword)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

//Testar user
router.get("/users/", function (req, res){
  Users.getUsers()
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

/*
router.get('/logout', function (req, res) {
  res.clearCookie('token');
  res.redirect('/');
});*/

module.exports = router;
