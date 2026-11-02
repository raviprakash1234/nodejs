require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME || "API"} running on port ${PORT}`);
});
