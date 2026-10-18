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
  if (id < 0) {
    throw new Error(`Not a valid Id`);
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
    console.log(users.map((user) => user.name));
    console.log(`Hello, ${user.name}! Email: ${user.email}`);
  } catch (error) {
    console.error("Could not load user:", error.message);
    process.exitCode = 1;
  }
}

main();
