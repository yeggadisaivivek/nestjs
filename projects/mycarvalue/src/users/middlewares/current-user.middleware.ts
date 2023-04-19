import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { UserId } = req.session || {};

    if (UserId) {
      console.log('User in CurrentUserMiddleware::::::::', UserId, req.session);
      const user = await this.userService.findOne(UserId);
      console.log('User in CurrentUserMiddleware::::::::', user);

      req.currentUser = user;
    }

    next();
  }
}
