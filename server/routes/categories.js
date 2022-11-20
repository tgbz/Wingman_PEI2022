var express = require("express");
var router = express.Router();
var Categories = require("../controllers/category");

// Get todas as categorias e o total gasto em cada
router.get("/userCategory/:id", function (req, res){
    Categories.getCategory(req.params.id)
    .then( dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }) 

module.exports = router;
