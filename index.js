const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Initialization
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Home" });
});

mongoose
  .connect(
    config.db,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    }
  )
  .then(db => {
    console.log("DataBase is conected!");
    app.listen(config.port, () => {
      console.log(`Server listening on https://localhost:${config.port}`);
    });
  })
  .catch(err => console.log(`Error al conectar con la base de datos: ${err}`));
