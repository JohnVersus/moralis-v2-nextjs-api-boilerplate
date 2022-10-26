import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getAllParams } from "../../../src/types/Streams";

interface getAllRequest extends NextApiRequest {
  body: getAllParams;
}

export default async function handler(
  req: getAllRequest,
  res: NextApiResponse
) {
  const { cursor, limit, networkType } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.getAll({
      cursor,
      limit,
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
