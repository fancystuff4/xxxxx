import { Response } from 'express';
import {
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
  ParseBoolPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ParseArrayFromOptionalString } from '../pipes/parseArray.pipe';

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

export const throwError = (error: any, options?: { message: string }) => {
  if (error.code === 'ER_DUP_ENTRY')
    throw new BadRequestException([options?.message || 'Duplicate entry']);

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
  OPTIONAL_ARRAY = 'OPTIONAL_ARRAY',
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

    case PipeDataType.OPTIONAL_ARRAY:
      return new ParseArrayFromOptionalString();
    default:
      break;
  }
};

export const ensureNoOffsetWithoutLimit = (limit: any, offset: any) => {
  const limitIsNotANumber = isNaN(limit);
  const offsetIsANumber = !isNaN(offset);

  if ((limitIsNotANumber || limit === 0) && offsetIsANumber)
    throw internalErrMsg(
      'Offset is not allowed without limit',
      HttpStatus.BAD_REQUEST,
    );
};

export const createCombinationOfElements = (args: Array<any>) => {
  const r = [];
  const max = args.length - 1;
  function helper(arr, i) {
    for (let j = 0, l = args[i].length; j < l; j++) {
      const a = arr.slice(0); // clone arr
      a.push(args[i][j]);
      if (i == max) r.push(a);
      else helper(a, i + 1);
    }
  }
  helper([], 0);
  return r;
};
