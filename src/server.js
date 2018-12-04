import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config";

import * as routes from "./routes";

// Initialization
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Home" });
});

app.use("/api", routes.productRoutes);
app.use("/api", routes.warehouseRoutes);
app.use("/api", routes.providerRoutes);

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
