import { Model, DataTypes, Optional, literal } from "sequelize";

import sequelize from "../config";

export interface CurrencyAttributes {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchangeRate?: number;
  decimalDigits: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CurrencyInput
  extends Optional<
    CurrencyAttributes,
    | "id"
    | "exchangeRate"
    | "decimalDigits"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {}

export interface CurrencyOutput
  extends Model<CurrencyAttributes, CurrencyInput>,
    CurrencyAttributes {}

class CurrencyModel
  extends Model<CurrencyAttributes, CurrencyInput>
  implements CurrencyOutput
{
  public id!: number;
  public name!: string;
  public code!: string;
  public symbol!: string;
  public exchangeRate!: number;
  public decimalDigits!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

CurrencyModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchangeRate: {
      type: DataTypes.FLOAT(30, 10),
      defaultValue: 1,
      field: "exchange_rate",
    },
    decimalDigits: {
      type: DataTypes.INTEGER({ length: 1 }),
      defaultValue: 0,
      field: "decimal_digits",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP()"),
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: literal("CURRENT_TIMESTAMP()"),
      onUpdate: "NOW()",
      allowNull: true,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      onDelete: "NOW()",
      field: "deleted_at",
    },
  },
  {
    tableName: "currencies",
    timestamps: true,
    paranoid: true,
    modelName: "Currencies",
    sequelize,
  }
);

export default CurrencyModel;
