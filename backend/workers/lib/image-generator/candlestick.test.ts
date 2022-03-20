import * as plot from "plot";

import candleStick from "./candlestick";

describe("Candlestick generator", () => {
  const plotMock = jest.spyOn(plot, "plot");
  const renderImageMock = jest.fn().mockReturnValue(Promise.resolve());

  plotMock.mockReturnValue({
    renderImage: renderImageMock,
  } as unknown as plot.IPlotAPI);
  const testData = [
    [1517443200, 10056.99, 10298, 10005, 10285.1, 1596.2308, 16196316],
    [1517529600, 10285.1, 10335, 8750.99, 9224.51, 33514.465, 317193950],
    [1517616000, 9224.51, 9250, 8010.02, 8873.03, 49416.133, 429309600],
  ];

  it(`calls plot`, async () => {
    await candleStick("foo", testData);
    expect(plotMock).toHaveBeenCalledWith(
      [
        {
          date: "01/02",
          candle: [10056.99, 10298, 10005, 10285.1],
        },
        {
          date: "02/02",
          candle: [10285.1, 10335, 8750.99, 9224.51],
        },
        {
          date: "03/02",
          candle: [9224.51, 9250, 8010.02, 8873.03],
        },
      ],
      { chartType: plot.ChartType.Candlestick },
      { x: "date", y: "candle" }
    );
  });

  it("calls renderImage", async () => {
    await candleStick("foo", testData);
    expect(renderImageMock).toHaveBeenCalledWith("/tmp/foo.chart.png", {
      openImage: false,
    });
  });

  it("returns file name generated", async () => {
    const result = await candleStick("foo", testData);
    expect(result).toEqual("/tmp/foo.chart.png");
  });
});
