import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTLowestPriceParams } from "../../../../src/types/EvmApi";

interface getNFTLowestPriceRequest extends NextApiRequest {
  body: getNFTLowestPriceParams;
}

export default async function handler(
  req: getNFTLowestPriceRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getNFTLowestPrice({
      address: req.body.address,
      chain: req.body.chain,
      days: req.body.days,
      marketplace: req.body.marketplace,
      providerUrl: req.body.providerUrl,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
