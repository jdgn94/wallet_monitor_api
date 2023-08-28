import { Request, Response } from "express";

import db from "../db/models";

const getAll = async (_req: Request, _res: Response) => {
  global.logger.info("on function to get all currencies");
  try {
    const currencies = await db.currencies.findAll();

    return _res.status(200).json({ currencies, message: "All currencies." });
  } catch (error) {
    global.logger.error(error);
    return _res.status(500).json({ message: error });
  }
};

export { getAll };
