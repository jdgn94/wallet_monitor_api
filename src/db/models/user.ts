import { CreationOptional, DataTypes, Model, Optional } from "sequelize";
import { Fn } from "sequelize/types/utils";

import db from "../config";

type UserAttributes = {
  id: number;
  username: string;
  email: string;
  password: Fn;
  createdAt: Date;
  updatedAt: Date;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      // defaultValue: literal("CURRENT_TIMESTAMP()"),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      // defaultValue: literal(
      //   "CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()"
      // ),
    },
  },
  {
    tableName: "users",
    sequelize: db,
  }
);

export default User;
