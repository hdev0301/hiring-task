import { Env } from "../env";
import jwt from "jsonwebtoken";

export const decodeToken = (token) => {
  const { secretKey } = Env;
  return jwt.verify(token, secretKey);
};
