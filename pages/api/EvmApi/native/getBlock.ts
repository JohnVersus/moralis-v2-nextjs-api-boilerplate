import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getBlockParams } from "../../../../src/types/EvmApi";

interface getBlockRequest extends NextApiRequest {
  body: getBlockParams;
}

export default async function handler(
  req: getBlockRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.native.getBlock({
      blockNumberOrHash: req.body.blockNumberOrHash,
      chain: req.body.chain,
      subdomain: req.body.subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
