import * as jwt from 'jsonwebtoken';

export const secret = process.env.JWT_SECRET;

interface JwtPayload {
  id: number;
}

export const sign = (data: JwtPayload, ttl = '4h') =>
  jwt.sign(data, secret, { expiresIn: ttl });

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload;
