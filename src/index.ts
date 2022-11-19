import dotenv from "dotenv";
import app from "./app";
import db from "./db/config";
process.env.NODE_ENV !== "production" && dotenv.config();

const main = async () => {
  try {
    const port = app.get("port");
    app.listen(port);
    global.logger.info("Server on port " + port);
    await db.authenticate();
    globalThis.logger.info("Database connected");
  } catch (error) {
    globalThis.logger.error("error to connect to database or server");
    globalThis.logger.error(error);
  }
};

main();
