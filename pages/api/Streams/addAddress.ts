import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { addAddressParams } from "../../../src/types/Streams";

interface addAddressRequest extends NextApiRequest {
  body: addAddressParams;
}

export default async function handler(
  req: addAddressRequest,
  res: NextApiResponse
) {
  const { address, id, networkType } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.addAddress({
      address,
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
