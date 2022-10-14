import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTokenAllowanceParams } from "../../../../src/types/EvmApi";

interface getTokenAllowanceRequest extends NextApiRequest {
  body: getTokenAllowanceParams;
}

export default async function handler(
  req: getTokenAllowanceRequest,
  res: NextApiResponse
) {
  const { address, chain, ownerAddress, providerUrl, spenderAddress } =
    req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenAllowance({
      address,
      chain,
      ownerAddress,
      providerUrl,
      spenderAddress,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
