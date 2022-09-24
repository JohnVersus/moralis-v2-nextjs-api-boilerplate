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
  const { address, chain, cursor, limit, offset } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
      address,
      chain,
      cursor,
      limit,
      offset,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
