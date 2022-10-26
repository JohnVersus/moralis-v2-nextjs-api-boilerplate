import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { verifySignatureParams } from "../../../src/types/Streams";

interface verifySignatureRequest extends NextApiRequest {
  body: verifySignatureParams;
}

export default async function handler(
  req: verifySignatureRequest,
  res: NextApiResponse
) {
  const { body, signature } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.Streams.verifySignature({
      body,
      signature,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
