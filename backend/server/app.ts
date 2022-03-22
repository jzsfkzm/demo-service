import bluebird from "bluebird";
import Bull, { Job } from "bull";
import config from "config";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/healthcheck", (_, response) => {
  response
    .status(200)
    .header("Content-Type", "application/json")
    .json({ healthy: true });
});

app.get("/jobs", async (_, response) => {
  const pdfQueue = new Bull("pdf-generator", config.get("redis"));
  const jobs = await pdfQueue.getJobs([], 0, 4);

  response
    .status(200)
    .header("Content-Type", "application/json")
    .json(
      await bluebird.map(jobs, async (job: Job) => {
        return {
          id: job.id,
          pair: job.data.pair,
          state: await job.getState(),
        };
      })
    );
});

app.post("/jobs", async (request, response) => {
  const pdfQueue = new Bull("pdf-generator", config.get("redis"));
  pdfQueue.add({
    pair: request.body.pair,
  });

  response.status(200).header("Content-Type", "application/json").json({});
});

export default app;
