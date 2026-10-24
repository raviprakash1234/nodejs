const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Asha", email: "asha@example.com" },
  { id: 2, name: "Ravi", email: "ravi@example.com" },
];

let nextId = 3;

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid user id." });
  }
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({ error: "name and email are required" });
  }
  const user = { id: nextId++, name: name.trim(), email: email.trim() };
  users.push(user);
  res.status(201).json(user);
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid user id." });
  }
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const { name, email } = req.body;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    return res.status(400).json({ error: "name and email are required" });
  }
  users[index] = { id, name: name.trim(), email: email.trim() };
  res.json(users[index]);
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid user id." });
  }

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found." });
  }

  const { name, email } = req.body;

  // Validate only fields the client wants to update
  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return res.status(400).json({ error: "Name must be a non-empty string." });
  }

  if (email !== undefined && (typeof email !== "string" || !email.trim())) {
    return res.status(400).json({ error: "Email must be a non-empty string." });
  }

  if (name === undefined && email === undefined) {
    return res.status(400).json({ error: "Provide name or email to update." });
  }

  users[index] = {
    ...users[index],
    ...(name !== undefined && { name: name.trim() }),
    ...(email !== undefined && { email: email.trim() }),
  };

  return res.status(200).json(users[index]);
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid user id." });
  }
  const exists = users.some((u) => u.id === id);
  if (!exists) return res.status(404).json({ error: "User not found" });
  users = users.filter((u) => u.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
