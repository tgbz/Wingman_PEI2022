var express = require("express");
var router = express.Router();
var Categories = require("../controllers/category");

// Get todas as categorias e o total gasto em cada
router.get("/userCategory/:id", function (req, res){
    Categories.getCategory(req.params.id)
    .then( dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }) 

router.put("/changePlafond/:id", function (req, res){
  console.log(req.body)
  Categories.changePlafond(req.params.id,req.body.idcategory,req.body.plafond)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.post("/changeAllPlafonds/:id", function (req, res){
  console.log(req.body)
  Categories.changeAllPlafonds(req.params.id,req.body.categories)
  .then( dados => {
    console.log(dados)
    res.jsonp(dados)
  })
  .catch(erro => res.status(500).jsonp(erro))
})


module.exports = router;
