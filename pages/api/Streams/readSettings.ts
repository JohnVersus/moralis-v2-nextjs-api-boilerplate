import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { readSettingsParams } from "../../../src/types/Streams";

interface readSettingsRequest extends NextApiRequest {
  body: readSettingsParams;
}

export default async function handler(
  req: readSettingsRequest,
  res: NextApiResponse
) {
  const {} = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.readSettings();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
