import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNftTransfersFromToBlockParams } from "../../../../src/types/EvmApi";

interface getNftTransfersFromToBlockRequest extends NextApiRequest {
  body: getNftTransfersFromToBlockParams;
}

export default async function handler(
  req: getNftTransfersFromToBlockRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getNftTransfersFromToBlock({
      chain: req.body.chain,
      cursor: req.body.cursor,
      format: req.body.format,
      fromBlock: req.body.fromBlock,
      fromDate: req.body.fromDate,
      limit: req.body.limit,
      offset: req.body.offset,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
