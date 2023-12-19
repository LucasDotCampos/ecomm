import { NextFunction, Request, Response } from "express";
import WebTokenProvider from "../modules/user/providers/webTokenProvider";
import { ITokenPayload } from "../modules/user/models/tokenPayload.model";

export default async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(400).json("JWT Token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenProvider = new WebTokenProvider();
    const decodedToken = await tokenProvider.verify(token);
    const { sub } = decodedToken as ITokenPayload;
    request.userId = sub;
    next();
  } catch (err: any) {
    return response.status(400).json(err.message);
  }
}
