var express = require("express");
var router = express.Router();

var StatementsController = require("../controllers/statementsController");

//Rota para criar um novo statement baseado num IBAN
router.post("/:iban", function (req, res) {
  StatementsController.initStatement(
    req.params.iban,
    function (err, statement) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        console.log("statement created");
        console.log(statement);
        res.json(statement);
      }
    }
  );
});

router.get("/update/:iban", function (req, res) {
  StatementsController.updateStatement(
    req.params.iban,
    function (err, statement) {
      if (err) {
        res.status(500).send(err.message);
      } else {
        console.log("statement updated");
        res.json(statement);
      }
    }
  );
});

//Rota para obter um dado statement baseado num IBAN
router.get("/:iban", function (req, res) {
  StatementsController.getStatement(req.params.iban, function (err, statement) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      console.log("statement updated");
      res.json(statement);
    }
  });
});

module.exports = router;
