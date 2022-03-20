import nock from "nock";

import cryptowatchClient, { StatSlot } from "./cryptowatch";
import btcusdt from "./nocks/btcusdt.json";
import ethusdt from "./nocks/ethusdt.json";

describe("Cryptowatch client", () => {
  nock("https://api.cryptowat.ch")
    .get("/markets/binance/btcusdt/ohlc")
    .reply(200, btcusdt);

  nock("https://api.cryptowat.ch")
    .get("/markets/binance/ethusdt/ohlc")
    .reply(200, ethusdt);

  const expected = {
    btcusdt: [
      1647406740, 39142.9, 39142.91, 39122.51, 39138.94, 10.29127,
      402705.3942167,
    ],
    ethusdt: [
      1647406980, 2619.6, 2619.6, 2616.67, 2618.05, 107.1367, 280459.718218,
    ],
  } as Record<string, StatSlot>;

  ["btcusdt", "ethusdt"].forEach((pair: string) => {
    it(`loads data for ${pair}`, async () => {
      const response = await cryptowatchClient(pair);
      expect(response.result[60][0]).toEqual(expected[pair]);
    });
  });
});
