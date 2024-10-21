import { Request, Response } from "express";

import db, { Currency } from "../db";

const getAll = async (_req: Request, _res: Response) => {
  global.logger.info("on function to get all currencies");
  try {
    const currencies = await db.getRepository(Currency).find();

    return _res.status(200).json({ currencies, message: "All currencies." });
  } catch (error) {
    global.logger.error(error);
    return _res.status(500).json({ message: error });
  }
};

export { getAll };
