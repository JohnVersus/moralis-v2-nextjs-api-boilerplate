import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getWalletNFTCollectionsParams } from "../../../../src/types/EvmApi";

interface getWalletNFTCollectionsRequest extends NextApiRequest {
  body: getWalletNFTCollectionsParams;
}

export default async function handler(
  req: getWalletNFTCollectionsRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, limit, offset } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getWalletNFTCollections({
      address,
      chain,
      cursor,
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
