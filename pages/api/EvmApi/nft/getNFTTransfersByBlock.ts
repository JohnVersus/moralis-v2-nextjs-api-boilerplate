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
  const { blockNumberOrHash, chain, cursor, limit, offset, subdomain } =
    req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTTransfersByBlock({
      blockNumberOrHash,
      chain,
      cursor,
      limit,
      offset,
      subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
