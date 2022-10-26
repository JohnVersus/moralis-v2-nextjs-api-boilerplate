import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { deleteParams } from "../../../src/types/Streams";

interface deleteRequest extends NextApiRequest {
  body: deleteParams;
}

export default async function handler(
  req: deleteRequest,
  res: NextApiResponse
) {
  const { id, networkType } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.delete({
      id,
      networkType,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
