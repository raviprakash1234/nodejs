const request = require("supertest");
const app = require("../app");

describe("Users API", () => {
  test("GET /api/users should return a list", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/users/1 should return a user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe("Asha");
  });

  test("GET with an invalid ID should return 400", async () => {
    const response = await request(app).get("/api/users/abc");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid user id.");
  });

  test("GET a missing user should return 404", async () => {
    const response = await request(app).get("/api/users/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  test("POST without required fields should return 400", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({ name: "Test User" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("name and email are required");
  });

  test("an unknown route should return 404", async () => {
    const response = await request(app).get("/unknown-route");

    expect(response.status).toBe(404);
    expect(response.body.error).toContain("Route not found");
  });
});

test("malformed JSON should return 400", async () => {
  const response = await request(app)
    .post("/api/users")
    .set("Content-Type", "application/json")
    .send('{"name":');

  expect(response.status).toBe(400);
  expect(response.body.error).toBe("Invalid JSON body.");
});
