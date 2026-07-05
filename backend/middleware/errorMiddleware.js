// =========================================
// Global Error Handler Middleware
// =========================================

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.error("====================================");
  console.error("❌ ERROR");
  console.error(err);
  console.error("====================================");

  let statusCode =
    err.statusCode || 500;

  let message =
    err.message || "Internal Server Error";

  // ============================
  // MongoDB Invalid ObjectId
  // ============================

  if (err.name === "CastError") {

    statusCode = 404;

    message = "Resource Not Found";

  }

  // ============================
  // MongoDB Duplicate Key
  // ============================

  if (err.code === 11000) {

    statusCode = 400;

    const field = Object.keys(
      err.keyValue
    )[0];

    message =
      `${field} already exists`;

  }

  // ============================
  // Mongoose Validation Error
  // ============================

  if (err.name === "ValidationError") {

    statusCode = 400;

    message = Object.values(
      err.errors
    )
      .map((item) => item.message)
      .join(", ");

  }

  // ============================

  res.status(statusCode).json({

    success: false,

    message,

    stack:
      process.env.NODE_ENV ===
      "development"
        ? err.stack
        : null,

  });

};

export default errorMiddleware;