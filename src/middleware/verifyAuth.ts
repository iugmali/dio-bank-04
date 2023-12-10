import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";

export const verifyAuth = (request: Request, response: Response, next: NextFunction) => {
  const authToken = request.headers.authorization;
  if (authToken) {
    const [, token] = authToken.split(' ')
    try {
      const { sub } = verify(token, '123456789');
      return next();
    } catch (error: any) {
      return response.status(401).json({message: 'Unauthorized.'});
    }
  }
  return response.status(401).json({message: 'Unauthorized.'});
}
