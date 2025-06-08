import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Currency } from "./currency";

@Entity({ name: "exchange_rates", comment: "Table of currencies" })
export class ExchangeRate {
  @PrimaryGeneratedColumn({
    type: "int",
    primaryKeyConstraintName: "pkExchangeRateId",
  })
  id: number;

  @Column({ type: "float", name: "exchangeRate", nullable: false })
  exchangeRate: number;

  @Column({ type: "int", name: "currencyId", nullable: false })
  currencyId: number;

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

  @ManyToOne(() => Currency, { cascade: true })
  @JoinColumn({ name: "currencyId" })
  currency: Currency;
}
