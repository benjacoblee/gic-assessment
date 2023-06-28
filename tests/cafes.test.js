const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_STR);
});
afterEach(async () => {
  await mongoose.connection.close();
});

afterAll(() => {
  app.server.close();
});

describe("GET /api/cafes", () => {
  it("should return all cafes", async () => {
    const res = await request(app.server).get("/api/cafes");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/cafe", () => {
  it("should create a cafe", async () => {
    const res = await request(app.server)
      .post("/api/cafe")
      .attach("files", "")
      .field("name", "Bagelhaus")
      .field("description", "Bagel House")
      .field("location", "Novena");

    expect(res.statusCode).toBe(201);
  });
});

describe("PUT /api/cafe", () => {
  it("should update a cafe", async () => {
    const cafe = await request(app.server)
      .get("/api/cafes")
      .then((res) => res.body[0]);

    const res = await request(app.server)
      .put("/api/cafe")
      .attach("files", "")
      .field("_id", cafe._id)
      .field("name", "Fine Acai");

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Fine Acai");
  });
});

describe("DELETE /api/cafe", () => {
  it("should delete a cafe", async () => {
    const cafe = await request(app.server)
      .get("/api/cafes")
      .then((res) => res.body[0]);

    const res = await request(app.server)
      .delete("/api/cafe")
      .send({ _id: cafe._id });
    expect(res.statusCode).toBe(204);
  });
});
