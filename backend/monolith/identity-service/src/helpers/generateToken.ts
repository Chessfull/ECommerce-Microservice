import jwt from "jsonwebtoken";

// -> Created for generate token as helper

export function generateToken(
  payload: object,
  secret: string,
  expiresIn: string
): string {
  return jwt.sign(payload, secret, { expiresIn });
}