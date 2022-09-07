import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getPairAddressParams } from "../../../../src/types/EvmApi";

interface getPairAddressRequest extends NextApiRequest {
  body: getPairAddressParams;
}

export default async function handler(
  req: getPairAddressRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.defi.getPairAddress({
      chain: req.body.chain,
      exchange: req.body.exchange,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
      token0Address: req.body.token0Address,
      token1Address: req.body.token1Address,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
