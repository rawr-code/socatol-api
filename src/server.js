const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const users = require("./routes/user");

// Load Routes
const routes = require("./routes");

// Warehouse Routes
const { WarehouseRoutes, ProductRoutes, PresentationRoutes } = routes.Warehouse;

// Initialization
const server = express();
server.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  // res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// Middlewares
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(cors());

// Passport Config
server.use(passport.initialize());
require("./config/passport")(passport);

// Routes
server.get("/", (req, res) => {
  res.status(200).json({ message: "Home" });
});
server.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "Private Route" });
  }
);

server.use("/user", users);
server.use("/api/warehouse", WarehouseRoutes);
server.use("/api/product", ProductRoutes);
server.use("/api/presentation", PresentationRoutes);

// Connect to database and run server
require("./config/mongoose")(server);
