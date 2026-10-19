const fs = require("node:fs");

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timer from I/O");
  }, 0);

  setImmediate(() => {
    console.log("immediate from I/O");
  });
});
