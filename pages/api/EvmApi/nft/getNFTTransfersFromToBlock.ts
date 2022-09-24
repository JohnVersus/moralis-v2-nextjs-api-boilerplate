import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTTransfersFromToBlockParams } from "../../../../src/types/EvmApi";

interface getNFTTransfersFromToBlockRequest extends NextApiRequest {
  body: getNFTTransfersFromToBlockParams;
}

export default async function handler(
  req: getNFTTransfersFromToBlockRequest,
  res: NextApiResponse
) {
  const {
    chain,
    cursor,
    format,
    fromBlock,
    fromDate,
    limit,
    offset,
    toBlock,
    toDate,
  } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock({
      chain,
      cursor,
      format,
      fromBlock,
      fromDate,
      limit,
      offset,
      toBlock,
      toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
