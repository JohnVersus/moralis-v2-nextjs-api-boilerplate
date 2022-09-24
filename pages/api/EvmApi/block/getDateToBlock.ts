import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getDateToBlockParams } from "../../../../src/types/EvmApi";

interface getDateToBlockRequest extends NextApiRequest {
  body: getDateToBlockParams;
}

export default async function handler(
  req: getDateToBlockRequest,
  res: NextApiResponse
) {
  const { chain, date, providerUrl } = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.block.getDateToBlock({
      chain,
      date,
      providerUrl,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
