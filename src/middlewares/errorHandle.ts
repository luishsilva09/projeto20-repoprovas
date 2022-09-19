import { NextFunction, Request, Response } from "express";

export default async function errorHandle(
  error: { code: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.code === "Invalid") return res.status(422).send(error.message);
  if (error.code === "Conflict") return res.status(409).send(error.message);
  if (error.code === "Unauthorized") return res.status(401).send(error.message);
  if (error.code === "NotFound") return res.status(404).send(error.message);
  console.log(error);
  return res.status(500).send(error);
}
