import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getWalletNFTsParams } from "../../../../src/types/EvmApi";

interface getWalletNFTsRequest extends NextApiRequest {
  body: getWalletNFTsParams;
}

export default async function handler(
  req: getWalletNFTsRequest,
  res: NextApiResponse
) {
  const { address, chain, cursor, format, limit, offset, tokenAddresses } =
    req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
      cursor,
      format,
      limit,
      offset,
      tokenAddresses,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
