import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { retryParams } from "../../../src/types/Streams";

interface retryRequest extends NextApiRequest {
  body: retryParams;
}

export default async function handler(req: retryRequest, res: NextApiResponse) {
  const { id, streamId } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.retry({
      id,
      streamId,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
