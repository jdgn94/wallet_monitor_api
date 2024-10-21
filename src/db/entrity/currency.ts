import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "currencies", comment: "Table of currencies" })
export class Currency {
  @PrimaryGeneratedColumn({
    type: "int",
    primaryKeyConstraintName: "pk_currency_id",
  })
  id: Number;

  @Column({ type: "varchar", name: "name", nullable: false })
  name: String;

  @Column({ type: "varchar", name: "code", nullable: false })
  code: String;

  @Column({ type: "varchar", name: "symbol", nullable: false })
  symbol: String;

  @Column({ type: "float", name: "exchange_rate", nullable: false })
  exchangeRate: Number;

  @Column({ type: "int", name: "decimal_digits", nullable: false })
  decimalDigits: Number;

  @Column({
    type: "datetime",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "datetime",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({
    type: "datetime",
    name: "deleted_at",
    nullable: true,
    default: null,
  })
  deletedAt: Date;
}
