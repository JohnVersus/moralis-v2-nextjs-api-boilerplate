import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getWalletTokenIdTransfersParams } from "../../../../src/types/EvmApi";

interface getWalletTokenIdTransfersRequest extends NextApiRequest {
  body: getWalletTokenIdTransfersParams;
}

export default async function handler(
  req: getWalletTokenIdTransfersRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getWalletTokenIdTransfers({
      address: req.body.address,
      chain: req.body.chain,
      cursor: req.body.cursor,
      format: req.body.format,
      limit: req.body.limit,
      offset: req.body.offset,
      order: req.body.order,
      tokenId: req.body.tokenId,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
