export default class ErrorHandler extends Error {
  constructor(err) {
    // ---------------------------
    // 1️⃣ Simple string error
    // ---------------------------
    if (typeof err === "string") {
      super(err);
      this.statusCode = 500;
      this.success = false;
      this.message = err;
      this.data = null;
      this.errors = null;
      this.meta = null;
      return;
    }

    // ---------------------------
    // 2️⃣ Custom object error
    // ---------------------------
    if (typeof err === "object" && err.statusCode) {
      super(err.message || "Something went wrong");
      this.statusCode = err.statusCode;
      this.success = false;
      this.message = err.message || "Something went wrong";
      this.data = err.data || null;
      this.errors = err.errors || null;
      this.meta = err.meta || null;
      return;
    }

    // ---------------------------
    // 3️⃣ Already ErrorHandler
    // ---------------------------
    if (err instanceof ErrorHandler) {
      return err;
    }

    // ---------------------------
    // 4️⃣ Default Error
    // ---------------------------
    super(err?.message || "Something went wrong");
    this.success = false;
    this.statusCode = err?.statusCode || 500;
    this.message = err?.message || "Something went wrong";
    this.data = err?.data || null;
    this.errors = err?.errors || null;
    this.meta = err?.meta || null;

    // ---------------------------
    // 5️⃣ Mongoose Validation
    // ---------------------------
    if (err?.name === "ValidationError") {
      this.statusCode = 400;
      this.message = "Mongoose Validation Error";
      this.errors = Object.values(err.errors || {}).map((e) => e.message);
    }

    // ---------------------------
    // 6️⃣ Duplicate Key
    // ---------------------------
    if (err?.code === 11000) {
      this.statusCode = 409;
      this.message = "Duplicate Key Error";
      this.errors = err.keyValue || null;
    }

    // ---------------------------
    // 7️⃣ Native JS Error
    // ---------------------------
    if (err instanceof Error) {
      this.stack = err.stack;
    }
  }
}
