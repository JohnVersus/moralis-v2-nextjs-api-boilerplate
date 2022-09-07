import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getLogsByAddressParams } from "../../../../src/types/EvmApi";

interface getLogsByAddressRequest extends NextApiRequest {
  body: getLogsByAddressParams;
}

export default async function handler(
  req: getLogsByAddressRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.native.getLogsByAddress({
      address: req.body.address,
      blockNumber: req.body.blockNumber,
      chain: req.body.chain,
      cursor: req.body.cursor,
      fromBlock: req.body.fromBlock,
      fromDate: req.body.fromDate,
      limit: req.body.limit,
      offset: req.body.offset,
      subdomain: req.body.subdomain,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
      topic0: req.body.topic0,
      topic1: req.body.topic1,
      topic2: req.body.topic2,
      topic3: req.body.topic3,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
