import axios from "axios";

export type StatSlot = number[];

export type ApiResponse = {
  result: Record<string, StatSlot[]>;
  allowance: {
    cost: number;
    remaining: number;
    upgrade: string;
  };
};

export default async (pair: string): Promise<ApiResponse> => {
  const response = await axios.get(
    `https://api.cryptowat.ch/markets/binance/${pair}/ohlc`
  );

  return response.data;
};
