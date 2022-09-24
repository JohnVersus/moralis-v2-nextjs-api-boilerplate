import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { resolveDomainParams } from "../../../../src/types/EvmApi";

interface resolveDomainRequest extends NextApiRequest {
  body: resolveDomainParams;
}

export default async function handler(
  req: resolveDomainRequest,
  res: NextApiResponse
) {
  const { currency, domain } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.resolve.resolveDomain({
      currency,
      domain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
