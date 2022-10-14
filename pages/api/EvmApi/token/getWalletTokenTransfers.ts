import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getWalletTokenTransfersParams } from "../../../../src/types/EvmApi";

interface getWalletTokenTransfersRequest extends NextApiRequest {
  body: getWalletTokenTransfersParams;
}

export default async function handler(
  req: getWalletTokenTransfersRequest,
  res: NextApiResponse
) {
  const {
    address,
    chain,
    cursor,
    fromBlock,
    fromDate,
    limit,
    offset,
    subdomain,
    toBlock,
    toDate,
  } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getWalletTokenTransfers({
      address,
      chain,
      cursor,
      fromBlock,
      fromDate,
      limit,
      offset,
      subdomain,
      toBlock,
      toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
