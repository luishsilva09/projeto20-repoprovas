import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY || "useSecretKey";

export default async function validToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw { code: "Unauthorized", message: "Token Invalido" };

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, secretKey, function (err, decode) {
    if (err) throw { code: "Invalid", message: err.message };
  });

  next();
}
