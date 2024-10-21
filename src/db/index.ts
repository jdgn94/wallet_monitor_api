import { DataSource } from "typeorm";
import { Currency } from "./entrity/currency";

export { Currency };

export default new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST ?? "localhost",
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
  username: process.env.DATABASE_USER ?? "root",
  password: process.env.DATABASE_PASS ?? "",
  database: process.env.DATABASE_NAME ?? "test",
  logging: ["error", "warn"],
  logger: "file",
  // debug: process.env.NODE_ENV !== "production" ? true : false,
  entities: [Currency],
  synchronize: true,
});
