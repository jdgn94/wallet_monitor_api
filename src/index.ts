import app from "./app";
import db from "./db";

import {
  insertCurrencies,
  insertCurrencyType,
} from "./db/seeds/currencies.seeds";
import { getLastExchangesRate } from "./utils/exchangeRates.utils";

const main = async () => {
  try {
    const port = app.get("port");
    app.listen(port);
    global.logger.info(`Server on port ${port}`);
    await db.initialize();
    await insertSeeds(false);
    await getLastExchangesRate();
    initInterval();
    global.logger.info("Database connected");
  } catch (error) {
    global.logger.error("error to connect to database or server");
    global.logger.error(error);
    console.error(error);
  }
};

const insertSeeds = async (runSeeds: boolean) => {
  if (!runSeeds) return;
  global.logger.info("insert seeds");
  await insertCurrencyType();
  await insertCurrencies();
  global.logger.info("seeds inserted");
};

const initInterval = async () => {
  setInterval(() => {
    getLastExchangesRate();
  }, 10800000);
};

main();
