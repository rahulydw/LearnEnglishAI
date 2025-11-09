export default class ResponseHandler {
  constructor({
    success = true,
    message = "Request successful",
    statusCode = 200,
    data = null,
    errors = null,
    meta = null,
    stack = null, // Optional for errors in development
  }) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.errors = errors;
    this.meta = meta;
    this.stack = stack; // Only include if needed (e.g., dev mode)
  }

  send(res) {
    const responseObj = {
      success: this.success,
      message: this.message,
      data: this.data,
      errors: this.errors,
      meta: this.meta,
    };

    // Add stack only if it exists (for errors in dev)
    if (this.stack) {
      responseObj.stack = this.stack;
    }

    return res.status(this.statusCode).json(responseObj);
  }
}
