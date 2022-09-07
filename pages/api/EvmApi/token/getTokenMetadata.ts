import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTokenMetadataParams } from "../../../../src/types/EvmApi";

interface getTokenMetadataRequest extends NextApiRequest {
  body: getTokenMetadataParams;
}

export default async function handler(
  req: getTokenMetadataRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenMetadata({
      addresses: req.body.addresses,
      chain: req.body.chain,
      providerUrl: req.body.providerUrl,
      subdomain: req.body.subdomain,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
