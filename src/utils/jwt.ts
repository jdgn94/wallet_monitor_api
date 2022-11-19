import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET_TOKEN || "secret";

export const createToken = async (data: Object): Promise<string> => {
  const token: string = await jwt.sign(data, secret);
  return token;
};

export const verifyToken = async (token: string): Promise<boolean> => {
  const payload = await jwt.verify(token, secret);
  console.log(payload);
  if (!!payload) return true;
  else return false;
};

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.header("Authorization");
  console.log(authorization);
  const token = authorization?.split(" ")[1];
  if (!token) return res.status(401).send("unauthorize");

  const check = await verifyToken(token);
  console.log("resultado del token", check);

  if (!check) return res.status(401).send("unauthorize");
  next();
};
