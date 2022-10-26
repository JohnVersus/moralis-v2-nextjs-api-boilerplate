import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { updateStatusParams } from "../../../src/types/Streams";

interface updateStatusRequest extends NextApiRequest {
  body: updateStatusParams;
}

export default async function handler(
  req: updateStatusRequest,
  res: NextApiResponse
) {
  const { id, networkType, status } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.updateStatus({
      id,
      networkType,
      status,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
