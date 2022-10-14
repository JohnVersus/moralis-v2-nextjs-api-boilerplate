import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import { EvmChain } from "@moralisweb3/evm-utils";
import { EvmChainish } from "@moralisweb3/evm-utils";

interface chainDataRequest extends NextApiRequest {
  body: EvmChain["apiId"];
}

export default async function handler(
  req: chainDataRequest,
  res: NextApiResponse
) {
  const chainId = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const chainData = EvmChain.create(chainId);
    res.status(200).json(chainData);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
