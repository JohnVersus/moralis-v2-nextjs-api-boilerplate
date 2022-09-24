import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { endpointWeightsParams } from "../../../../src/types/EvmApi";

interface endpointWeightsRequest extends NextApiRequest {
  body: endpointWeightsParams;
}

export default async function handler(
  req: endpointWeightsRequest,
  res: NextApiResponse
) {
  const {} = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.utils.endpointWeights();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
