import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('User in Adminguard::::', request.currentUser);
    if (!request.currentUser) {
      return false;
    }

    if (request.currentUser.admin) {
      return true;
    } else {
      return false;
    }
  }
}
