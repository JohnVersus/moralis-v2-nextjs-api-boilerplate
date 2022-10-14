import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTOwnersParams } from "../../../../src/types/EvmApi";

interface getNFTOwnersRequest extends NextApiRequest {
  body: getNFTOwnersParams;
}

export default async function handler(
  req: getNFTOwnersRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, format, limit, offset } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTOwners({
      address,
      chain,
      cursor,
      format,
      limit,
      offset,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
