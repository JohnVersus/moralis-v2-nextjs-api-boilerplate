import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTokenMetadataBySymbolParams } from "../../../../src/types/EvmApi";

interface getTokenMetadataBySymbolRequest extends NextApiRequest {
  body: getTokenMetadataBySymbolParams;
}

export default async function handler(
  req: getTokenMetadataBySymbolRequest,
  res: NextApiResponse
) {
  const { chain, subdomain, symbols } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenMetadataBySymbol({
      chain,
      subdomain,
      symbols,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
