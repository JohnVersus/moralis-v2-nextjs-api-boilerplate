import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTTradesParams } from "../../../../src/types/EvmApi";

interface getNFTTradesRequest extends NextApiRequest {
  body: getNFTTradesParams;
}

export default async function handler(
  req: getNFTTradesRequest,
  res: NextApiResponse
) {
  const {
    address,
    chain,
    cursor,
    fromBlock,
    fromDate,
    limit,
    marketplace,
    offset,
    providerUrl,
    toBlock,
    toDate,
  } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTTrades({
      address,
      chain,
      cursor,
      fromBlock,
      fromDate,
      limit,
      marketplace,
      offset,
      providerUrl,
      toBlock,
      toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
