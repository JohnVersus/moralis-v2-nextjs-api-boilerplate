import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getTokenIdMetadataParams } from "../../../../src/types/EvmApi";

interface getTokenIdMetadataRequest extends NextApiRequest {
  body: getTokenIdMetadataParams;
}

export default async function handler(
  req: getTokenIdMetadataRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getTokenIdMetadata({
      address: req.body.address,
      chain: req.body.chain,
      format: req.body.format,
      tokenId: req.body.tokenId,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
