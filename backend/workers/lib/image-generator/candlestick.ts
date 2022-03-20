import moment from "moment";
import { plot, ChartType } from "plot";
import "@plotex/render-image";

import { StatSlot } from "../client/cryptowatch";

type CandleData = {
  date: string;
  candle: number[];
};

const transform = (stats: StatSlot[]): CandleData[] => {
  return stats.map((slot: StatSlot) => {
    return {
      date: moment(slot[0] * 1000).format("DD/MM"),
      candle: slot.slice(1, 5),
    };
  });
};

export default async (id: string, stats: StatSlot[]): Promise<string> => {
  const imageName = `/tmp/${id}.chart.png`;
  const plotter = plot(
    transform(stats),
    { chartType: ChartType.Candlestick },
    { x: "date", y: "candle" }
  );
  await plotter.renderImage(imageName, {
    openImage: false,
  });

  return imageName;
};
