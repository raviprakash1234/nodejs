console.log("Start");

setTimeout(() => {
  console.log("Timer callback executed");
}, 0);

const start = Date.now();

while (Date.now() - start < 3000) {
  // Synchronously block JavaScript for ~3 seconds
}

console.log("Loop finished");
