var express = require("express");
var app = express();
port = process.env.PORT || 3335;

var logger = require("morgan");

var bodyParser = require("body-parser");

app.listen(port);
console.log("Mock Bank API server started on: " + port);

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./api/routes/index"));
app.use("/statements", require("./api/routes/statements"));

var db = require("./api/config/database");

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect(db.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("TRYING TO CONNECT TO MONGODB");
    var Mstate = mongoose.connection.readyState;
    if (Mstate == 1) {
      mongoose.connection.on(
        "error",
        console.error.bind(console, "MongoDB: erro na conexão: ")
      );
      console.log("MongoDB: pronto. Status: " + Mstate);
      //avisa que o servidor está pronto a receber pedidos
    } else {
      console.error("MongoDB: não foi possível aceder.");
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("MongoDB: não foi possível aceder: " + err);
    process.exit(1);
  });

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send(`${err.message}`);
});

module.exports = app;
