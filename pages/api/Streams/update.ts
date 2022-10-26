import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { updateParams } from "../../../src/types/Streams";

interface updateRequest extends NextApiRequest {
  body: updateParams;
}

export default async function handler(
  req: updateRequest,
  res: NextApiResponse
) {
  const {
    abi,
    advancedOptions,
    allAddresses,
    chains,
    description,
    id,
    includeContractLogs,
    includeInternalTxs,
    includeNativeTxs,
    networkType,
    tag,
    topic0,
    webhookUrl,
  } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.update({
      abi,
      advancedOptions,
      allAddresses,
      chains,
      description,
      id,
      includeContractLogs,
      includeInternalTxs,
      includeNativeTxs,
      networkType,
      tag,
      topic0,
      webhookUrl,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
