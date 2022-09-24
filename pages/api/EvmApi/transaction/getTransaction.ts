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
  const { chain, subdomain, transactionHash } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.transaction.getTransaction({
      chain,
      subdomain,
      transactionHash,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
