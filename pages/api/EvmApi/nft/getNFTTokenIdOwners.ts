import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTTokenIdOwnersParams } from "../../../../src/types/EvmApi";

interface getNFTTokenIdOwnersRequest extends NextApiRequest {
  body: getNFTTokenIdOwnersParams;
}

export default async function handler(
  req: getNFTTokenIdOwnersRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, format, limit, offset, tokenId } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
      address,
      chain,
      cursor,
      format,
      limit,
      offset,
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
