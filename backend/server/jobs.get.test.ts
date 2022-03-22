import * as original from "bull";
jest.mock("bull");
import request from "supertest";

import app from "./app";

type FakeJob = {
  id: number;
  data: Record<string, string>;
  getState: () => Promise<string>;
};

const getJobs = jest.fn();

const createFakeBull = (jobs: FakeJob[]) => {
  getJobs.mockImplementation(async () => {
    return Promise.resolve(jobs);
  });

  return {
    getJobs,
  };
};

const createFakeJob = (
  id: number,
  pair = "btcusdt",
  state = "completed"
): FakeJob => {
  return {
    id,
    data: { pair },
    getState: () => Promise.resolve(state),
  };
};

describe("GET /jobs", function () {
  const mocked = original as jest.Mocked<typeof original>;
  const Bull = mocked.default;

  beforeEach(() => {
    Bull.mockClear();
  });

  describe("loading jobs", () => {
    it("loads 5 jobs", async () => {
      Bull.mockReturnValue(createFakeBull([]) as unknown as original.Queue);
      await request(app).get("/jobs");

      expect(getJobs).toHaveBeenCalledWith([], 0, 4);
    });
  });

  describe("no jobs in the queue", () => {
    it("returns empty array", (done) => {
      Bull.mockReturnValue(createFakeBull([]) as unknown as original.Queue);
      request(app)
        .get("/jobs")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, [], done);
    });
  });

  describe("has some jobs in the queue", () => {
    it("returns those jobs", (done) => {
      Bull.mockReturnValue(
        createFakeBull([
          createFakeJob(2, "btcusdt", "completed"),
          createFakeJob(1, "ethusdt", "completed"),
          createFakeJob(0, "btcusdt", "completed"),
        ]) as unknown as original.Queue
      );

      request(app)
        .get("/jobs")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(
          200,
          [
            {
              id: 2,
              pair: "btcusdt",
              state: "completed",
            },
            {
              id: 1,
              pair: "ethusdt",
              state: "completed",
            },
            {
              id: 0,
              pair: "btcusdt",
              state: "completed",
            },
          ],
          done
        );
    });
  });
});
