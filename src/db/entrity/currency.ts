import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { CurrencyType } from "./currencyType";
import { ExchangeRate } from "./exchangeRate";

@Entity({ name: "currencies", comment: "Table of currencies" })
export class Currency {
  @PrimaryGeneratedColumn({
    type: "int",
    primaryKeyConstraintName: "pkCurrencyId",
  })
  id: number;

  @Column({ type: "varchar", name: "name", nullable: false })
  name: string;

  @Column({ type: "varchar", name: "namePlural", nullable: false })
  namePlural: string;

  @Column({ type: "varchar", name: "code", nullable: false })
  code: string;

  @Column({ type: "varchar", name: "symbol", nullable: false })
  symbol: string;

  @Column({ type: "varchar", name: "symbolNative", nullable: false })
  symbolNative: string;

  @Column({ type: "int", name: "decimalDigits", nullable: false })
  decimalDigits: number;

  @Column({ type: "int", name: "typeId", nullable: false })
  typeId: number;

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

  @ManyToOne(() => CurrencyType, { cascade: true })
  @JoinColumn({ name: "typeId" })
  type: CurrencyType;

  @OneToMany(() => ExchangeRate, (exchangeRate) => exchangeRate.currencyId, {
    cascade: true,
  })
  exchangeRates: ExchangeRate[];
}
