import express, { Application } from "express";
import morgan from "morgan";

import { logger, stream } from "./config/winston";
// import authRoutes from "./routes/auth";

import currencyRoutes from "./routes/currency.route";

global.logger = logger;
const app: Application = express();
const baseURL: String = "/api";

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

export default app;
