import express, { Application } from "express";
import morgan from "morgan";

import { logger, stream } from "./config/winston";
// import authRoutes from "./routes/auth";

import currencyRoutes from "./routes/currency.route";

global.logger = logger;
const app: Application = express();
const baseURL: string = "/api";

// middleware
app.use(morgan("dev"));
app.use(morgan("combined", { stream }));
app.use(express.json()); // convert req.body to json
app.use(express.urlencoded({ extended: false }));

// settings
app.set("port", process.env.PORT || 3000);

// routes
// app.use(baseURL + "", authRoutes);
app.use(baseURL + "/currency", currencyRoutes);
app.get(`${baseURL}/`, (_req, _res) => {
  global.logger.info("on function to get root");
});

export default app;
