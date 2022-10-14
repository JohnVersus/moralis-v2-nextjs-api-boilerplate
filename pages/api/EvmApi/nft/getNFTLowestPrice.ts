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
  const { address, chain, days, marketplace, providerUrl } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTLowestPrice({
      address,
      chain,
      days,
      marketplace,
      providerUrl,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
