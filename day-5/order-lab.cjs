// console.log("sync:start");

// process.nextTick(() => {
//   console.log("nextTick");
// });

// Promise.resolve().then(() => {
//   console.log("Promise.then");
//   process.nextTick(() => {
//     console.log("nextTick inside Promise");
//   });
// });

// setTimeout(() => {
//   console.log("timer");
// }, 0);

// setImmediate(() => {
//   console.log("immediate");
// });

// console.log("sync:end");

console.log("Start");

setTimeout(() => {
  console.log("Timer callback executed");
}, 0);

const start = Date.now();

while (Date.now() - start < 3000) {
  // Synchronously block JavaScript for ~3 seconds
}

console.log("Loop finished");
