import axios from "axios";

import db, { Currency, ExchangeRate } from "../db";

const apiKey = process.env.API_KEY;

interface MetaValue {
  last_updated_at: Date;
}

interface CurrentExchangeValues {
  code: string;
  value: number;
}

interface ExchangeRateResponse {
  meta: MetaValue;
  data: CurrentExchangeValues[];
}

interface IExchangeRate {
  currencyId: number;
  exchangeRate: number;
}

const _insertExchangeRates = async (value: ExchangeRateResponse) => {
  const exchangeRates = value.data;
  let exchangeRatesToInsert = [] as IExchangeRate[];
  try {
    for (const code in exchangeRates) {
      console.log(exchangeRates[code]);
      const exchangeRate = exchangeRates[code].value;
      const lastExchangeRate = await db
        .getRepository(ExchangeRate)
        .createQueryBuilder("exchangeRate")
        .innerJoinAndSelect("exchangeRate.currency", "currency")
        .where("currency.code = :code", { code: code })
        .orderBy("exchangeRate.id", "DESC")
        .getOne();

      if (!lastExchangeRate) {
        const currency = await db
          .getRepository(Currency)
          .findOne({ where: { code: code } });

        if (!currency) {
          continue;
        }

        exchangeRatesToInsert.push({
          currencyId: currency.id,
          exchangeRate: exchangeRate,
        });
        continue;
      }

      if (lastExchangeRate.exchangeRate !== exchangeRate) {
        exchangeRatesToInsert.push({
          currencyId: lastExchangeRate.currency.id,
          exchangeRate: exchangeRate,
        });
      }
    }
    if (exchangeRatesToInsert.length > 0) {
      console.log(exchangeRatesToInsert);
      await db.getRepository(ExchangeRate).save(exchangeRatesToInsert);
    }
  } catch (error) {
    console.error(error);
    global.logger.error(error);
  }
};

const getLastExchangesRate = async () => {
  try {
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`;

    const { status, data } = await axios.get(url);

    if (status !== 200) {
      global.logger.error("not found currencies");
      console.log(data.response);
      return;
    }
    data as ExchangeRateResponse;

    // console.log(data);
    const resConsult = data;
    await _insertExchangeRates(resConsult);
    return;
  } catch (error) {
    global.logger.error(error);
  }
};

export { getLastExchangesRate };
