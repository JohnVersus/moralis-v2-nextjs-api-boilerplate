import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type {} from "../../../../src/types/EvmApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.info.web3ApiVersion();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
