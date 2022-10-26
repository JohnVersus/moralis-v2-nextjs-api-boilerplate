import Moralis from "moralis";
import type { parsedLogsParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface parsedLogsRequest extends Request {
  body: parsedLogsParams;
}

const config = functions.config();

export const parsedLogs = async (req: parsedLogsRequest, res: Response) => {
  const { tag, webhookData } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.parsedLogs({
      tag,
      webhookData,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
