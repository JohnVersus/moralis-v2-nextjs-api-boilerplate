import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getAllTokenIdsParams } from "../../../../src/types/EvmApi";

interface getAllTokenIdsRequest extends NextApiRequest {
  body: getAllTokenIdsParams;
}

export default async function handler(
  req: getAllTokenIdsRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getAllTokenIds({
      address: req.body.address,
      chain: req.body.chain,
      cursor: req.body.cursor,
      format: req.body.format,
      limit: req.body.limit,
      offset: req.body.offset,
      range: req.body.range,
      totalRanges: req.body.totalRanges,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
