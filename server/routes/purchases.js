var express = require("express");
var router = express.Router();
var Purchases = require("../controllers/purchases");

router.get("/getPurchase/:id", function (req, res){
  Purchases.getPurchase(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.post('/createPurchase/',function(req,res){
  Purchases.createPurchase(req.body)
      .then(purchase => res.jsonp(purchase))
      .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;