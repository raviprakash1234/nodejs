import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const usersPath = join(currentDir, "users.json");

async function loadUsers() {
  const json = await readFile(usersPath, "utf-8");
  return JSON.parse(json);
}

async function getUsersById(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`ID must be a positive integer`);
  }
  const users = await loadUsers();
  const user = users.find((item) => item.id === id);

  if (!user) {
    throw new Error(`User ${id} not found`);
  }
  return user;
}

async function main() {
  try {
    const user = await Promise.all([
      getUsersById(1),
      getUsersById(2),
      getUsersById(3),
    ]);
    console.log(user.map((user) => user.name));
    for (const data of user) {
      console.log(`Hello, ${data.name}! Email: ${data.email}`);
    }
  } catch (error) {
    console.error("Could not load user:", error.message);
    process.exitCode = 1;
  }
}

main();
