import request from "supertest";

import app from "./";

describe("GET /healthcheck", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/healthcheck")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
