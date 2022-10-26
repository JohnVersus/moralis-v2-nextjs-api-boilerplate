import Moralis from "moralis";
import type { retryParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface retryRequest extends Request {
  body: retryParams;
}

const config = functions.config();

export const retry = async (req: retryRequest, res: Response) => {
  const { id, streamId } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.retry({
      id,
      streamId,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
