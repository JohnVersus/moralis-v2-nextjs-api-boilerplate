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
  const {
    abi,
    address,
    chain,
    cursor,
    fromBlock,
    fromDate,
    limit,
    offset,
    providerUrl,
    subdomain,
    toBlock,
    toDate,
    topic,
  } = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.events.getContractEvents({
      abi,
      address,
      chain,
      cursor,
      fromBlock,
      fromDate,
      limit,
      offset,
      providerUrl,
      subdomain,
      toBlock,
      toDate,
      topic,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
