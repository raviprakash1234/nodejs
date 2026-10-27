const AppError = require("../utils/AppError");

let users = [
  { id: 1, name: "Asha", email: "asha@example.com" },
  { id: 2, name: "Ravi", email: "ravi@example.com" },
];

let nextId = 3;

function parseId(rowId) {
  const id = Number(rowId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Invalid user id.", 400);
  }
  return id;
}

function validateRequiredFields(body = {}) {
  const { name, email } = body;
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    throw new AppError("name and email are required", 400);
  }

  return { name: name.trim(), email: email.trim() };
}

function findUser(id) {
  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

exports.list = (req, res) => {
  return res.status(200).json(users);
};

exports.getById = (req, res) => {
  const id = parseId(req.params.id);
  const user = findUser(id);
  return res.status(200).json(user);
};

exports.create = (req, res) => {
  const { name, email } = validateRequiredFields(req.body);

  const user = {
    id: nextId++,
    name,
    email,
  };

  users.push(user);

  return res.status(201).json(user);
};

exports.replace = (req, res) => {
  const id = parseId(req.params.id);

  // Ensure the user exists
  findUser(id);

  const { name, email } = validateRequiredFields(req.body);

  const updatedUser = { id, name, email };

  users = users.map((user) => (user.id === id ? updatedUser : user));

  return res.status(200).json(updatedUser);
};

exports.update = (req, res) => {
  const id = parseId(req.params.id);
  const existingUser = findUser(id);
  const { name, email } = req.body || {};

  if (name === undefined && email === undefined) {
    throw new AppError("Provide name or email to update.", 400);
  }

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    throw new AppError("Name must be a non-empty string.", 400);
  }

  if (email !== undefined && (typeof email !== "string" || !email.trim())) {
    throw new AppError("Email must be a non-empty string.", 400);
  }

  const updatedUser = {
    ...existingUser,
    ...(name !== undefined && { name: name.trim() }),
    ...(email !== undefined && { email: email.trim() }),
  };

  users = users.map((user) => (user.id === id ? updatedUser : user));

  return res.status(200).json(updatedUser);
};

exports.remove = (req, res) => {
  const id = parseId(req.params.id);

  findUser(id);

  users = users.filter((user) => user.id !== id);

  return res.status(204).end();
};
