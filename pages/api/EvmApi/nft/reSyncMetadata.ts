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
  const { address, chain, flag, mode, tokenId } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.nft.reSyncMetadata({
      address,
      chain,
      flag,
      mode,
      tokenId,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
