import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTTransfersByBlockParams } from "../../../../src/types/EvmApi";

interface getNFTTransfersByBlockRequest extends NextApiRequest {
  body: getNFTTransfersByBlockParams;
}

export default async function handler(
  req: getNFTTransfersByBlockRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.native.getNFTTransfersByBlock({
      blockNumberOrHash: req.body.blockNumberOrHash,
      chain: req.body.chain,
      cursor: req.body.cursor,
      limit: req.body.limit,
      offset: req.body.offset,
      subdomain: req.body.subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
