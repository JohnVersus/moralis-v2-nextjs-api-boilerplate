import Moralis from "moralis";
import type { verifySignatureParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface verifySignatureRequest extends Request {
  body: verifySignatureParams;
}

const config = functions.config();

export const verifySignature = async (
  req: verifySignatureRequest,
  res: Response
) => {
  const { body, signature } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

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
};
