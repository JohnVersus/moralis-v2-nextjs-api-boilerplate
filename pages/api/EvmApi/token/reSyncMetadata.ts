import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { reSyncMetadataParams } from "../../../../src/types/EvmApi";

interface reSyncMetadataRequest extends NextApiRequest {
  body: reSyncMetadataParams;
}

export default async function handler(
  req: reSyncMetadataRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.reSyncMetadata({
      address: req.body.address,
      chain: req.body.chain,
      flag: req.body.flag,
      mode: req.body.mode,
      tokenId: req.body.tokenId,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
