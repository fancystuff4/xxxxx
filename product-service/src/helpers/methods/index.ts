import { Response } from 'express';
import {
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
  ParseBoolPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { objType } from '../constants';

export const INTERNAL = 'INTERNAL';
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

export const internalErrMsg = (msg?: string, statusCode?: number) => ({
  errMsg: msg,
  errOrigin: INTERNAL,
  errCode: statusCode,
});

export const throwError = (error: any, options?: { field: string }) => {
  if (error.code === 'ER_DUP_ENTRY')
    throw new BadRequestException([
      options?.field ? `${options.field} already exists` : 'Duplicate entry',
    ]);

  if (error.errOrigin === INTERNAL) {
    if (error.errCode === HttpStatus.BAD_REQUEST)
      throw new BadRequestException([error.errMsg || 'Bad request']);
  }

  throw new InternalServerErrorException(['Internal server error']);
};

export const _isArray = (variable) => variable instanceof Array;

export const _isEmpty = (arrayOrObject) => _size(arrayOrObject) === 0;
export const _size = (arrayOrObject) =>
  arrayOrObject
    ? (_isArray(arrayOrObject) ? arrayOrObject : Object.keys(arrayOrObject))
        .length
    : 0;

export enum PipeDataType {
  UUID = 'UUID',
  BOOLEAN = 'BOOLEAN',
}

export const insertValidationPipe = (type?: PipeDataType) => {
  switch (type) {
    case PipeDataType.BOOLEAN:
      return new ParseBoolPipe({
        exceptionFactory: (errors) => new BadRequestException([errors]),
      });

    case PipeDataType.UUID:
      return new ParseUUIDPipe({
        exceptionFactory: (errors) => new BadRequestException([errors]),
      });

    default:
      break;
  }
};
