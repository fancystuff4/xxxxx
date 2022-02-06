import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ItemsInBody = createParamDecorator((key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (key) return request.body[key];

    return request.body;
});