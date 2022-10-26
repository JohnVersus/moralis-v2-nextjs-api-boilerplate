import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { parsedLogsParams } from "../../../src/types/Streams";

interface parsedLogsRequest extends NextApiRequest {
  body: parsedLogsParams;
}

export default async function handler(
  req: parsedLogsRequest,
  res: NextApiResponse
) {
  const { tag, webhookData } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.parsedLogs({
      tag,
      webhookData,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
