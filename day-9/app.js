const express = require("express");
const usersRouter = require("./routes/users.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(express.json());

app.use("/api", apiLimiter);
app.use("/api/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
