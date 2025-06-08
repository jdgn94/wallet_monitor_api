import { DataSource } from "typeorm";
import { Currency } from "./entrity/currency";
import { CurrencyType } from "./entrity/currencyType";
import { ExchangeRate } from "./entrity/exchangeRate";

export { Currency, CurrencyType, ExchangeRate };

const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_USER: user,
  DATABASE_PASS: pass,
  DATABASE_NAME: dbName,
} = process.env;

export default new DataSource({
  type: "mysql",
  host: host ?? "localhost",
  port: port ? parseInt(port) : 3306,
  username: user ?? "root",
  password: pass ?? "",
  database: dbName ?? "test",
  logging: ["error", "warn"],
  logger: "file",
  // debug: process.env.NODE_ENV !== "production" ? true : false,
  entities: [CurrencyType, Currency, ExchangeRate],
  synchronize: true,
});
