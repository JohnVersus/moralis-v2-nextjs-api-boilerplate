import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTContractTransfersParams } from "../../../../src/types/EvmApi";

interface getNFTContractTransfersRequest extends NextApiRequest {
  body: getNFTContractTransfersParams;
}

export default async function handler(
  req: getNFTContractTransfersRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, limit, offset } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTContractTransfers({
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