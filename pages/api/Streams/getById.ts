import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getByIdParams } from "../../../src/types/Streams";

interface getByIdRequest extends NextApiRequest {
  body: getByIdParams;
}

export default async function handler(
  req: getByIdRequest,
  res: NextApiResponse
) {
  const { id, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.getById({
      id,
      network,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
