import Moralis from "moralis";
import type { updateStatusParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface updateStatusRequest extends Request {
  body: updateStatusParams;
}

const config = functions.config();

export const updateStatus = async (req: updateStatusRequest, res: Response) => {
  const { id, networkType, status } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.updateStatus({
      id,
      networkType,
      status,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
