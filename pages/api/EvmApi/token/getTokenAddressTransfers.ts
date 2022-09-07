import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTokenAddressTransfersParams } from "../../../../src/types/EvmApi";

interface getTokenAddressTransfersRequest extends NextApiRequest {
  body: getTokenAddressTransfersParams;
}

export default async function handler(
  req: getTokenAddressTransfersRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenAddressTransfers({
      address: req.body.address,
      chain: req.body.chain,
      cursor: req.body.cursor,
      fromBlock: req.body.fromBlock,
      fromDate: req.body.fromDate,
      limit: req.body.limit,
      offset: req.body.offset,
      subdomain: req.body.subdomain,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
