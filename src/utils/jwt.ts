import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET_TOKEN || "secret";

interface IPayload {
  id: number;
  username: string;
  email: string;
}

export const createToken = (data: Object): string => {
  const token: string = jwt.sign(data, secret);
  return token;
};

export const verifyToken = (token: string): boolean => {
  const payload = jwt.verify(token, secret) as IPayload;
  if (!!payload) return true;
  else return false;
};

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const headers = req.headers;
  const authorization = headers.authorization;
  const token = authorization?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "unauthorize" });
  res.setHeader("authorization", authorization);

  const check = verifyToken(token);
  if (!check) return res.status(401).send({ message: "unauthorize" });
  const payload = jwt.verify(token, secret) as IPayload;

  req.params = {
    ...req.params,
    user_id: payload.id.toString(),
    email: payload.email,
    username: payload.username,
  };
  next();
};
