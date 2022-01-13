import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";

// bearer 102930ajslkdaoq01

interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  console.log(authorization);

  if (!authorization) {
    throw new Error("no authentication");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("token not authenticated");
  }

  return next();
};
