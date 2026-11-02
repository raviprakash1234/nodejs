const express = require("express");
const usersRouter = require("./routes/users.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use("/api/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
