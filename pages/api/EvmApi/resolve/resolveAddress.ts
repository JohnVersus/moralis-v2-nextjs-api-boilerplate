import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { resolveAddressParams } from "../../../../src/types/EvmApi";

interface resolveAddressRequest extends NextApiRequest {
  body: resolveAddressParams;
}

export default async function handler(
  req: resolveAddressRequest,
  res: NextApiResponse
) {
  const { address } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.resolve.resolveAddress({
      address,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
