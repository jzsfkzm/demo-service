import request from "supertest";

import * as originalS3 from "../lib/client/s3";

import app from "./app";

jest.mock("../lib/client/s3");

describe("GET /jobs/5", function () {
  const mockedS3 = originalS3 as jest.Mocked<typeof originalS3>;

  describe("downloading pdf for a job", () => {
    it("redirects to the URL generated", (done) => {
      mockedS3.signedUrl.mockResolvedValue("mockedUrl");

      request(app)
        .get("/jobs/5")
        .expect("Location", "mockedUrl")
        .expect(302, {}, done);
    });
  });
});
