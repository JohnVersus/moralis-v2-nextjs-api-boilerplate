import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getHistoryParams } from "../../../src/types/Streams";

interface getHistoryRequest extends NextApiRequest {
  body: getHistoryParams;
}

export default async function handler(
  req: getHistoryRequest,
  res: NextApiResponse
) {
  const { cursor, excludePayload, limit } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.getHistory({
      cursor,
      excludePayload,
      limit,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
