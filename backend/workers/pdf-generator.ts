import stream from "stream";

import Bull from "bull";
import config from "config";
import Pdfkit from "pdfkit";

import { upload } from "../lib/client/s3";

import cryptowatch from "./lib/client/cryptowatch";
import candlestick from "./lib/image-generator/candlestick";

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

pdfQueue.process(async (job, done) => {
  const stats = await cryptowatch(job.data.pair);
  const filename = await candlestick(job.id as string, stats.result["86400"]);
  const key = `${job.id}.pdf`;

  await upload(pdfStream(filename), key);

  done();
});