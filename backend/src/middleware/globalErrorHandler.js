// middlewares/globalErrorHandler.js
import ErrorHandler from "../utils/ErrorHandler.js";
import ResponseHandler from "../utils/ResponseHandler.js";

const globalErrorHandler = (err, req, res, next) => {
  // Create formatted error from ErrorHandler
  const formattedError = new ErrorHandler(err);

  // In production, remove stack trace for security
  if (process.env.NODE_ENV === "production") {
    formattedError.stack = undefined;
  }

  // Use ResponseHandler to send the response
  new ResponseHandler({
    success: formattedError.success,
    message: formattedError.message,
    statusCode: formattedError.statusCode,
    data: formattedError.data,
    errors: formattedError.errors,
    meta: formattedError.meta,
  }).send(res);
};

export default globalErrorHandler;
