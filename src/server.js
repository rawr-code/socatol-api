const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

// Load Routes
const routes = require("./routes");

// User Routes
const { UserRoutes } = routes.User;

// Bank Routes
const { CurrencyRoutes, BankRoutes, AccountRoutes } = routes.Bank;

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

// API: User Routes
server.use("/api/user", UserRoutes);

// API: Wareouse Routes
server.use("/api/warehouse", WarehouseRoutes);
server.use("/api/product", ProductRoutes);
server.use("/api/presentation", PresentationRoutes);

// API: Bank Routes
server.use("/api/currency", CurrencyRoutes);
server.use("/api/bank", BankRoutes);
server.use("/api/account", AccountRoutes);

// Connect to database and run server
require("./config/mongoose")(server);
