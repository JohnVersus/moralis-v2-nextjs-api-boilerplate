import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { runContractFunctionParams } from "../../../../src/types/EvmApi";

interface runContractFunctionRequest extends NextApiRequest {
  body: runContractFunctionParams;
}

export default async function handler(
  req: runContractFunctionRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.native.runContractFunction({
      abi: req.body.abi,
      address: req.body.address,
      chain: req.body.chain,
      functionName: req.body.functionName,
      params: req.body.params,
      providerUrl: req.body.providerUrl,
      subdomain: req.body.subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
