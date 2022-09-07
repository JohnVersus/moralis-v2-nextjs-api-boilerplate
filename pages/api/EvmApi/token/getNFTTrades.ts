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
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getNFTTrades({
      address: req.body.address,
      chain: req.body.chain,
      cursor: req.body.cursor,
      fromBlock: req.body.fromBlock,
      fromDate: req.body.fromDate,
      limit: req.body.limit,
      marketplace: req.body.marketplace,
      offset: req.body.offset,
      providerUrl: req.body.providerUrl,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
