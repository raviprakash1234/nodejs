const express = require("express");
const usersRouter = require("./routes/users.routes");
const notFound = require("./utils/notFound");
const errorHandler = require("./middleware/errorhandler");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
