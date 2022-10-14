import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getBlockParams } from "../../../../src/types/EvmApi";

interface getBlockParamsRequest extends NextApiRequest {
  body: getBlockParams;
}

export default async function handler(
  req: getBlockParamsRequest,
  res: NextApiResponse
) {
  const { blockNumberOrHash, chain, subdomain } = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.block.getBlock({
      blockNumberOrHash,
      chain,
      subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
