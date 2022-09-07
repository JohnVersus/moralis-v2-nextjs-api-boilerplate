import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTokenPriceParams } from "../../../../src/types/EvmApi";

interface getTokenPriceRequest extends NextApiRequest {
  body: getTokenPriceParams;
}

export default async function handler(
  req: getTokenPriceRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenPrice({
      address: req.body.address,
      chain: req.body.chain,
      exchange: req.body.exchange,
      providerUrl: req.body.providerUrl,
      to_block: req.body.to_block,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
