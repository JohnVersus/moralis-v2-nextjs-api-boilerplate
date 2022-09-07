import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getContractEventsParams } from "../../../../src/types/EvmApi";

interface getContractEventsRequest extends NextApiRequest {
  body: getContractEventsParams;
}

export default async function handler(
  req: getContractEventsRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.native.getContractEvents({
      abi: req.body.abi,
      address: req.body.address,
      chain: req.body.chain,
      cursor: req.body.cursor,
      fromBlock: req.body.fromBlock,
      fromDate: req.body.fromDate,
      limit: req.body.limit,
      offset: req.body.offset,
      providerUrl: req.body.providerUrl,
      subdomain: req.body.subdomain,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
      topic: req.body.topic,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
