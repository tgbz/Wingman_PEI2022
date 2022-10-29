var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
//Var Users = require('../controllers/users');


router.get("/",function(req, res){
    res.render("index"); 
 });
 
 router.get("/protegida", isLoggedIn, function(req, res){
     res.render("protegida", {utilizador: req.user});
 });
 
 router.get("/registo", function(req, res){
     res.render("registo-form");
 });
 
 // handeling user sign up
 router.post("/registo", function(req, res){
     // console.log(req.body.username);
     // console.log(req.body.password);
     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
         if(err){
             console.log(err);
             return res.render("registo-form");
         }
         passport.authenticate("local")(req, res, function(){
             res.redirect("/protegida");
         });
     });
 });
 
 // Login Form
 router.get("/login", function(req, res){
     res.render("login-form");
 });
 
 // Login Logic
 // middleware
 router.post("/login", passport.authenticate("local",{
     successRedirect: "/protegida",
     failureRedirect: "/login"
 }), function(req, res){
 
 });
 
 // Logout
 router.get("/logout", function(req, res){
     req.logout();
     res.redirect("/");
 });
 
 // check isLoggedIn
 function isLoggedIn(req, res, next){
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect("/login");
 }



module.exports = router;