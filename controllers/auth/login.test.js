const express = require("express");
const request = require("supertest");

const login = require("./login");

const app = express();

describe("test login controller", () => {
  beforeAll(() => app.listen(3000));

  test("login return contacts array", async () => {
    const response = await request(app).get(
      "/api/contacts"
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const [contact] = response.body;
    expect(typeof contact.name).toBe("string");
    expect(typeof contact.email).toBe("string");
    expect(typeof contact.phone).toBe("string");
  });
});
