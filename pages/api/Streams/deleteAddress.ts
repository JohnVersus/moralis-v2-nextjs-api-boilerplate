import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { deleteAddressParams } from "../../../src/types/Streams";

interface deleteAddressRequest extends NextApiRequest {
  body: deleteAddressParams;
}

export default async function handler(
  req: deleteAddressRequest,
  res: NextApiResponse
) {
  const { address, id, networkType } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.deleteAddress({
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
