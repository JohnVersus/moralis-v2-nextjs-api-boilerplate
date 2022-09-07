import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getContractNFTTransfersParams } from "../../../../src/types/EvmApi";

interface getContractNFTTransfersRequest extends NextApiRequest {
  body: getContractNFTTransfersParams;
}

export default async function handler(
  req: getContractNFTTransfersRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getContractNFTTransfers({
      address: req.body.address,
      chain: req.body.chain,
      cursor: req.body.cursor,
      format: req.body.format,
      limit: req.body.limit,
      offset: req.body.offset,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
