import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getNFTContractMetadataParams } from "../../../../src/types/EvmApi";

interface getNFTContractMetadataRequest extends NextApiRequest {
  body: getNFTContractMetadataParams;
}

export default async function handler(
  req: getNFTContractMetadataRequest,
  res: NextApiResponse
) {
  const { address, chain } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getNFTContractMetadata({
      address,
      chain,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
