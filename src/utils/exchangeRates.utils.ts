import axios from "axios";
import moment from "moment";
import { Currency } from "../interfaces/currency.interface";
import db from "../db/models";

const getLastExchangesRate = async () => {
  try {
    const dateTime = moment();
    if (
      (dateTime.hour() === 0 || dateTime.hour() === 12) &&
      dateTime.minute() === 0
    ) {
      const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.API_KEY}`;

      const { status, data } = await axios.get(url);

      if (status !== 200) {
        global.logger.error("not found currencies");
        console.log(data.response);
        return;
      }

      console.log(data);
      const resConsult = data as Currency;
      await _insertExchangeRates(resConsult);
      return;
    }
  } catch (error) {
    global.logger.error(error);
  }
};

const _insertExchangeRates = async (value: Currency) => {
  const exchangeRates = value.data;
  const t = await db.sequelize.transaction();
  try {
    for (const code in exchangeRates) {
      const exchangeRate = exchangeRates[code].value / (code === "VEF" ? 100000 : 1);
      await db.currencies.update(
        {
          exchangeRate: exchangeRate,
        },
        {
          where: { code },
          transaction: t,
        }
      );
    }

    await t.commit();
  } catch (error) {
    global.logger.error(error);
    await t.rollback();
  }
};

export { getLastExchangesRate };
