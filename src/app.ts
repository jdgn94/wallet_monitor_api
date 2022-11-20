import express, { Application } from "express";
import morgan from "morgan";

import { logger, stream } from "./config/winston";
import authRoutes from "./routes/auth";

global.logger = logger;
const app: Application = express();
const baseURL: String = "/api";

// middleware
app.use(morgan("dev"));
app.use(morgan("combined", { stream }));
app.use(express.json()); // convert req.body to json

// settings
app.set("port", process.env.PORT);

// routes
app.use(baseURL + "", authRoutes);

export default app;
