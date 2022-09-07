import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTransactionParams } from "../../../../src/types/EvmApi";

interface getTransactionRequest extends NextApiRequest {
  body: getTransactionParams;
}

export default async function handler(
  req: getTransactionRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.native.getTransaction({
      chain: req.body.chain,
      subdomain: req.body.subdomain,
      transactionHash: req.body.transactionHash,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
