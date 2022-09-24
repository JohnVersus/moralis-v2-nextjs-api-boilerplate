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
  const {
    addresses,
    chain,
    cursor,
    filter,
    format,
    fromBlock,
    fromDate,
    limit,
    offset,
    q,
    toBlock,
    toDate,
  } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.searchNFTs({
      addresses,
      chain,
      cursor,
      filter,
      format,
      fromBlock,
      fromDate,
      limit,
      offset,
      q,
      toBlock,
      toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
