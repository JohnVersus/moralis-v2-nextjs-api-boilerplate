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
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenAllowance({
      address: req.body.address,
      chain: req.body.chain,
      ownerAddress: req.body.ownerAddress,
      providerUrl: req.body.providerUrl,
      spenderAddress: req.body.spenderAddress,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
