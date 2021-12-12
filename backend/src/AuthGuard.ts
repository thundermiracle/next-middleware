import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

const getBearerToken = (req: Request): string => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    return null;
  }
  const [, token] = authorization.split(' ');
  return token;
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // get bearer token from Authorization header
    const bearerToken = getBearerToken(request);

    // check if bearer token is valid
    if (bearerToken) {
      try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        console.log(bearerToken, '->', decoded);
      } catch (err) {
        console.error(err.message);
        return false;
      }
      return true;
    }

    return false;
  }
}
