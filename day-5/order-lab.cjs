console.log("sync:start");

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise.then");
  process.nextTick(() => {
    console.log("nextTick inside Promise");
  });
});

setTimeout(() => {
  console.log("timer");
}, 0);

setImmediate(() => {
  console.log("immediate");
});

console.log("sync:end");
