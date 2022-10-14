import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { syncNFTContractParams } from "../../../../src/types/EvmApi";

interface syncNFTContractRequest extends NextApiRequest {
  body: syncNFTContractParams;
}

export default async function handler(
  req: syncNFTContractRequest,
  res: NextApiResponse
) {
  const { address, chain } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.syncNFTContract({
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
