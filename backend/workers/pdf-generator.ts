import stream from "stream";

import Bull, { JobId } from "bull";
import bunyan from "bunyan";
import config from "config";
import Pdfkit from "pdfkit";
import { w3cwebsocket as W3cWebSocket } from "websocket";

import { upload } from "../lib/client/s3";

import cryptowatch from "./lib/client/cryptowatch";
import candlestick from "./lib/image-generator/candlestick";

const logger = bunyan.createLogger({
  name: "pdf-generator",
  level: config.get("logLevel"),
});

const pdfStream = (imageName: string): stream.Duplex => {
  const doc = new Pdfkit();

  const passThrough = new stream.PassThrough();

  doc.pipe(passThrough);
  doc.fontSize(14).text("Lorem ipsum dolor sit amet");
  doc.image(imageName, {
    fit: [500, 600],
    align: "center",
  });
  doc.end();

  return passThrough;
};

const pdfQueue = new Bull("pdf-generator", config.get("redis"));
const client = new W3cWebSocket(config.get("server"));

const sendJobState = (id: JobId, state: string) => {
  client.send(JSON.stringify({ id: id.toString(), state }));
};

pdfQueue.process(async (job, done) => {
  logger.debug({ jid: job.id }, "creating PDF");
  sendJobState(job.id, "active");
  logger.debug({ jid: job.id }, "loading data from cryptowatch API");
  const stats = await cryptowatch(job.data.pair);
  logger.debug({ jid: job.id }, "plotting image");
  const filename = await candlestick(
    job.id as string,
    stats.result["86400"].slice(-30)
  );
  const key = `${job.id}.pdf`;

  logger.debug({ jid: job.id }, "uploading PDF");
  await upload(pdfStream(filename), key);
  sendJobState(job.id, "completed");
  logger.debug({ jid: job.id }, "PDF created");

  done();
});
