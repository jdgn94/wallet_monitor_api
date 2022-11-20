import app from "./app";
import db from "./db/models";

const main = async () => {
  try {
    const port = app.get("port");
    app.listen(port);
    global.logger.info(`Server on port ${port}`);
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    global.logger.info("Database connected");
  } catch (error) {
    global.logger.error("error to connect to database or server");
    global.logger.error(error);
    console.error(error);
  }
};

main();
