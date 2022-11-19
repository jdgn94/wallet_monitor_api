import express, { Application } from "express";
import morgan from "morgan";

import { logger, stream } from "./config/winston";

const app: Application = express();
const baseURL: String = "/api";

globalThis.logger = logger;

// middleware
app.use(morgan("dev"));
app.use(morgan("combined", { stream }));
app.use(express.json()); // convert req.body to json

// settings
app.set("port", process.env.PORT || 3000);

// db connection

// routes

export default app;
