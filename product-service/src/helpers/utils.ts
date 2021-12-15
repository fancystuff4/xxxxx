export const sendResponse = (
  res: any,
  statusCode: number,
  data?: any,
  error?: string,
  message?: string | any[],
) => {
  return res.status(statusCode).json({
    statusCode,
    data,
    error,
    message,
  });
};

// export const errorObj = (
//   statusCode: number,
//   error: string,
//   message: string | any[],
// ) => ({
//   statusCode,
//   message,
//   error,
// });
