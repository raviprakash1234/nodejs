import { EventEmitter } from "node:events";

const appName = process.env.APP_NAME || "Node Day 6 App";

const mode = process.argv[2] || "development";

const events = new EventEmitter();

events.on("order:created", (order) => {
  console.log(
    `[notification] Order #${order.id} created for ${order.customer}`,
  );
});

events.once("order:created", (order) => {
  console.log(`[audit] First order event captured: #${order.id}`);
});

events.on("order:created", logOrderAmount);

function logOrderAmount(order) {
  console.log(`[amount] Order #${order.id}: ₹${order.amount}`);
}

function createdOrder({ id, customer, amount }) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Order id must be a positive integer");
  }

  if (typeof customer !== "string" || customer.trim() === "") {
    throw new Error("Customer name is required");
  }

  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    throw new Error("Amount must be a positive finite number");
  }

  const order = {
    id,
    customer: customer.trim(),
    amount,
  };

  events.emit("order:created", order);
  return order;
}

console.log(`Starting ${appName}`);
console.log(`Mode: ${mode}`);

try {
  createdOrder({ id: 101, customer: "Ravi", amount: 999 });
  events.off("order:created", logOrderAmount);
  console.log("Amount listener removed");
  createdOrder({ id: 102, customer: "kajal", amount: 1299 });
  //   createdOrder({ id: 102, customer: "kajal", amount: -1 }); // for checking error handling
} catch (error) {
  console.error("Could not create order:", error.message);
  process.exitCode = 1;
}
