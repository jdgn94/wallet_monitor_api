import axios from "axios";
import moment from "moment";

import db from "../db";

interface MetaValue {
  last_updated_at: Date;
}

interface DataValue {
  code: string;
  value: number;
}

interface CurrencyResponse {
  meta: MetaValue;
  data: DataValue[];
}

const _insertExchangeRates = async (value: CurrencyResponse) => {
  const exchangeRates = value.data;
  const q = db.createQueryRunner();
  await q.startTransaction();
  try {
    for (const code in exchangeRates) {
      const exchangeRate =
        exchangeRates[code].value / (code === "VEF" ? 100000 : 1);
      await q.manager.update("currencies", { code }, { exchangeRate });
    }

    await q.commitTransaction();
  } catch (error) {
    global.logger.error(error);
    await q.rollbackTransaction();
  }
};

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
      data as CurrencyResponse;

      console.log(data);
      const resConsult = data;
      await _insertExchangeRates(resConsult);
      return;
    }
  } catch (error) {
    global.logger.error(error);
  }
};

export { getLastExchangesRate };
