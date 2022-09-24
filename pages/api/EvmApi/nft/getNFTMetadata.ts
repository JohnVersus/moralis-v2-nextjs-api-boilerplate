import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTMetadataParams } from "../../../../src/types/EvmApi";

interface getNFTMetadataRequest extends NextApiRequest {
  body: getNFTMetadataParams;
}

export default async function handler(
  req: getNFTMetadataRequest,
  res: NextApiResponse
) {
  const { address, chain } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
