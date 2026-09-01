const request = require("supertest");
const app = require("../server");

describe("CloudStock API", () => {

  test("GET / should return API status", async () => {

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
      .toBe("CloudStock API is running successfully!");

  });

});