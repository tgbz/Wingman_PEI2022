var express = require("express");
var router = express.Router();
var Purchases = require("../controllers/purchases");

router.get("/userPurchase/:id", function (req, res){
  Purchases.getPurchase(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;