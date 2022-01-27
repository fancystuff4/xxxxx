import { TOKENS } from '..';
import { Response } from 'express';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export const getTokensConfig = (atsecret: string, rtsecret: string) => ({
  [TOKENS.ACCESS_TOKEN]: {
    expiresIn: 60, // in seconds
    secret: atsecret,
  },

  [TOKENS.REFRESH_TOKEN]: {
    expiresIn: 600, // in seconds
    secret: rtsecret,
  },
});

export const sendResponse = (
  res: Response,
  statusCode: number,
  result?: any,
  errorArr?: any[],
  errorType?: string,
) => {
  res.status(statusCode).send({
    statusCode,
    data: result,
    message: errorArr,
    error: errorType,
  });
};

export const handleTokenVerifation = (err: any, user: any, info: any) => {
  if (err || !user) {
    if (info?.name === 'JsonWebTokenError')
      throw new BadRequestException([info?.message || 'Invalid token']);

    if (info?.name === 'TokenExpiredError')
      throw new BadRequestException([info?.message || 'jwt expired']);

    throw new UnauthorizedException(['You are not authorized']);
  }

  return user;
};
