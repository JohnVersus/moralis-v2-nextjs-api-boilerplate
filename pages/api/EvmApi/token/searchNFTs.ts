import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { searchNFTsParams } from "../../../../src/types/EvmApi";

interface searchNFTsRequest extends NextApiRequest {
  body: searchNFTsParams;
}

export default async function handler(
  req: searchNFTsRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.searchNFTs({
      address: req.body.addresses,
      chain: req.body.chain,
      cursor: req.body.cursor,
      filter: req.body.filter,
      format: req.body.format,
      fromBlock: req.body.fromBlock,
      fromDate: req.body.fromDate,
      limit: req.body.limit,
      offset: req.body.offset,
      q: req.body.q,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
      tokenAddress: req.body.tokenAddress,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
