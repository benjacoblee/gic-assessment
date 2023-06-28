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

describe("GET /api/employees", () => {
  it("should return all employees", async () => {
    const res = await request(app.server).get("/api/employees");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("POST /api/employee", () => {
  it("should create an employee", async () => {
    const res = await request(app.server).post("/api/employee").send({
      name: "Andrew",
      email_address: "andrew@google.com",
      phone_number: "98302932",
      gender: "Male"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Andrew");
  });

  it("should return a server error if email is invalid", async () => {
    const res = await request(app.server).post("/api/employee").send({
      name: "Andrew",
      email_address: "invalid"
    });
    expect(res.statusCode).toBe(500);
  });

  it("should return a server error if gender is not provided", async () => {
    const res = await request(app.server).post("/api/employee").send({
      name: "Andrew",
      email_address: "andrew@google.com",
      phone_number: "98302932"
    });
    expect(res.statusCode).toBe(500);
  });

  it("should return a server error if phone number does not start with 8 or 9", async () => {
    const res = await request(app.server).post("/api/employee").send({
      name: "Andrew",
      email_address: "andrew@google.com",
      phone_number: "7777777",
      gender: "Male"
    });
    expect(res.statusCode).toBe(500);
  });

  it("should return a server error if phone number is too short", async () => {
    const res = await request(app.server).post("/api/employee").send({
      name: "Andrew",
      email_address: "andrew@google.com",
      phone_number: "9382039",
      gender: "Male"
    });
    expect(res.statusCode).toBe(500);
  });

  it("should provide a start date when cafe is assigned", async () => {
    const cafe = await request(app.server)
      .get("/api/cafes")
      .then((res) => res.body[0]);

    const res = await request(app.server).post("/api/employee").send({
      name: "Andrew",
      email_address: "andrew@google.com",
      phone_number: "98302932",
      gender: "Male",
      cafe_id: cafe._id
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.start_date).toBeTruthy();
  });
});

describe("PUT /api/employee", () => {
  it("should update an employee", async () => {
    const employee = await request(app.server)
      .get("/api/employees")
      .then((res) => res.body[0]);

    const res = await request(app.server).put("/api/employee").send({
      _id: employee._id,
      name: "Jedediah"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Jedediah");
  });

  it("should return a server error if employee email is invalid", async () => {
    const employee = await request(app.server)
      .get("/api/employees")
      .then((res) => res.body[0]);

    const res = await request(app.server).put("/api/employee").send({
      _id: employee._id,
      email_address: "invalid"
    });

    expect(res.statusCode).toBe(500);
  });

  it("should return success if employee email is valid", async () => {
    const employee = await request(app.server)
      .get("/api/employees")
      .then((res) => res.body[0]);

    const res = await request(app.server).put("/api/employee").send({
      _id: employee._id,
      email_address: "valid@email.com"
    });

    expect(res.statusCode).toBe(200);
  });

  it("should return a server error if phone number is too short", async () => {
    const employee = await request(app.server)
      .get("/api/employees")
      .then((res) => res.body[0]);

    const res = await request(app.server).put("/api/employee").send({
      _id: employee._id,
      phone_number: "9382039"
    });

    expect(res.statusCode).toBe(500);
  });

  it("should return a server error if phone number does not start with 8 or 9", async () => {
    const employee = await request(app.server)
      .get("/api/employees")
      .then((res) => res.body[0]);

    const res = await request(app.server).put("/api/employee").send({
      _id: employee._id,
      phone_number: "73627382"
    });

    expect(res.statusCode).toBe(500);
  });
});

describe("DELETE /api/employee", () => {
  it("should delete an employee", async () => {
    const employee = await request(app.server)
      .get("/api/employees")
      .then((res) => res.body[0]);

    const res = await request(app.server).delete("/api/employee").send({
      _id: employee._id
    });

    expect(res.statusCode).toBe(200);
  });
});
