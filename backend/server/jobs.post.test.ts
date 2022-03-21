import * as original from "bull";
jest.mock("bull");
import request from "supertest";

import app from ".";

const add = jest.fn();

const createFakeBull = () => {
  return {
    add,
  };
};

describe("POST /jobs", function () {
  const mocked = original as jest.Mocked<typeof original>;
  const Bull = mocked.default;

  beforeEach(() => {
    Bull.mockClear();
  });

  describe("creating a job", () => {
    it("returns HTTP 200", (done) => {
      Bull.mockReturnValue(createFakeBull() as unknown as original.Queue);
      request(app)
        .post("/jobs")
        .send({
          pair: "btcusdt",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {}, done);
    });

    it("adds new job", async () => {
      Bull.mockReturnValue(createFakeBull() as unknown as original.Queue);
      await request(app)
        .post("/jobs")
        .send({
          pair: "btcusdt",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {});

      expect(add).toHaveBeenCalledWith({ pair: "btcusdt" });
    });
  });
});
