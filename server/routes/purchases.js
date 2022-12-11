var express = require("express");
var router = express.Router();
var Purchases = require("../controllers/purchases");

router.get("/getPurchase/:id", function (req, res){
  Purchases.getPurchase(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.get("/getAllPurchase/:id", function (req, res){
  Purchases.getAllPurchase(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.get("/getRecurrent/:id", function (req, res){
  Purchases.getRecurrent(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.post('/createPurchase/',function(req,res){
  Purchases.addPurchase(req.body.is_recurring, req.body.date, req.body.value, req.body.description, req.body.idUser, req.body.seller,req.body.idMovement,req.body.isFromAPI,req.body.type,req.body.verified,req.body.category,req.body.idProduct)
      .then(purchase => res.jsonp(purchase))
      .catch(erro => res.status(500).jsonp(erro))
});

router.put("/cancelRecurrent/:id", function (req, res){
  Purchases.cancelRecurrent(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router;