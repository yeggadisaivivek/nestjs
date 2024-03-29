import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUserDecorator = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('Cureent user::::::', request.currentUser);
    return request.currentUser;
  },
);
