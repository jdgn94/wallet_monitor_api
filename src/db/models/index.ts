import connect from "../config";
import CurrencyModel from "./currency.model";

const db = {
  sequelize: connect,
  currencies: CurrencyModel,
};

export default db;
