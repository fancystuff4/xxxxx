import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetParameterFromRequest = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (key) return request[key];

    return request;
  },
);
