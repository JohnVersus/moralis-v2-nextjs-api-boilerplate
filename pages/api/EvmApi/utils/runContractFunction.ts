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
  const { abi, address, chain, functionName, params, providerUrl, subdomain } =
    req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.utils.runContractFunction({
      abi,
      address,
      chain,
      functionName,
      params,
      providerUrl,
      subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
