import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Currency } from "./currency";

@Entity({ name: "currency_types", comment: "Table of currencies" })
export class CurrencyType {
  @PrimaryGeneratedColumn({
    type: "int",
    primaryKeyConstraintName: "pkCurrencyTypeId",
  })
  id: number;

  @Column({ type: "varchar", name: "name", nullable: false, unique: true })
  name: string;

  @Column({
    type: "datetime",
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "datetime",
    name: "updatedAt",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({
    type: "datetime",
    name: "deletedAt",
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;

  @OneToMany(() => Currency, (currency) => currency.typeId, { cascade: true })
  currencies: Currency[];
}
