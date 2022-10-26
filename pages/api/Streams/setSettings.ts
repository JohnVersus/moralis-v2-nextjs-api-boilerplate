import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { setSettingsParams } from "../../../src/types/Streams";

interface setSettingsRequest extends NextApiRequest {
  body: setSettingsParams;
}

export default async function handler(
  req: setSettingsRequest,
  res: NextApiResponse
) {
  const { region } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.setSettings({
      region,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
