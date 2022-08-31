import { Response } from 'express';

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

export const internalErrMsg = (msg?: string) => ({
  errMsg: msg || 'Internal Server Error',
});
