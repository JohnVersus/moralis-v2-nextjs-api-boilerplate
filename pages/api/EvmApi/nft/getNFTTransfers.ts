import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTTransfersParams } from "../../../../src/types/EvmApi";

interface getNFTTransfersRequest extends NextApiRequest {
  body: getNFTTransfersParams;
}

export default async function handler(
  req: getNFTTransfersRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, format, limit, offset, order, tokenId } =
    req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTTransfers({
      address,
      chain,
      cursor,
      format,
      limit,
      offset,
      order,
      tokenId,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
