function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.statusCode || err.status || 500;
  const isServerError = statusCode >= 500;

  if (isServerError) {
    console.error(err);
  }

  let message;
  if (err.type === "entity.parse.failed") {
    message = "Invalid JSON body.";
  } else if (isServerError) {
    message = "Internal server error.";
  } else {
    message = err.message;
  }

  return res.status(statusCode).json({
    error: message,
  });
}

module.exports = errorHandler;
