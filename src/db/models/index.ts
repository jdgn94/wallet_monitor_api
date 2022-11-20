import sequelize from "sequelize";

import connect from "../config";
import User from "./user";

const db = {
  sequelize: connect,
  Sequelize: sequelize,
  User,
};

export default db;
