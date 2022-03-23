import bluebird from "bluebird";
import Bull, { Job } from "bull";
import config from "config";
import cors from "cors";
import express from "express";
import expressWs from "express-ws";

import { signedUrl } from "../lib/client/s3";

const expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());
const expressWsInstance = expressWs(expressApp);
const { app } = expressWsInstance;

app.get("/healthcheck", (_, response) => {
  response
    .status(200)
    .header("Content-Type", "application/json")
    .json({ healthy: true });
});

app.get("/jobs/:id", async (request, response) => {
  const filename = `${request.params.id}.pdf`;
  const url = await signedUrl(filename);

  response.redirect(url);
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

app.ws("/", (ws) => {
  ws.on("message", (message) => {
    expressWsInstance.getWss().clients.forEach((client) => {
      client.send(message);
    });
  });
});

export default app;
