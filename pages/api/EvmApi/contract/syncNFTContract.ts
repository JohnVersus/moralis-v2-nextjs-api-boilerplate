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
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.syncNFTContract({
      address: req.body.address,
      chain: req.body.chain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
