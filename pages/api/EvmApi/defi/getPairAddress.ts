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
  const { chain, exchange, toBlock, toDate, token0Address, token1Address } =
    req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.defi.getPairAddress({
      chain,
      exchange,
      toBlock,
      toDate,
      token0Address,
      token1Address,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
