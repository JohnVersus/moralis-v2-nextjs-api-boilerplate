import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getAddressesParams } from "../../../src/types/Streams";

interface getAddressesRequest extends NextApiRequest {
  body: getAddressesParams;
}

export default async function handler(
  req: getAddressesRequest,
  res: NextApiResponse
) {
  const { id, networkType } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.getAddresses({
      id,
      networkType,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
