import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getContractNFTsParams } from "../../../../src/types/EvmApi";

interface getContractNFTsRequest extends NextApiRequest {
  body: getContractNFTsParams;
}

export default async function handler(
  req: getContractNFTsRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, limit, offset } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getContractNFTs({
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
