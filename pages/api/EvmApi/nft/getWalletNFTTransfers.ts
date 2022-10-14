import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getWalletNFTTransfersParams } from "../../../../src/types/EvmApi";

interface getWalletNFTTransfersRequest extends NextApiRequest {
  body: getWalletNFTTransfersParams;
}

export default async function handler(
  req: getWalletNFTTransfersRequest,
  res: NextApiResponse
) {
  const {
    address,
    chain,
    cursor,
    direction,
    format,
    fromBlock,
    limit,
    offset,
    toBlock,
  } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.getWalletNFTTransfers({
      address,
      chain,
      cursor,
      direction,
      format,
      fromBlock,
      limit,
      offset,
      toBlock,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
