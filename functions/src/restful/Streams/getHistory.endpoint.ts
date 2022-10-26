import Moralis from "moralis";
import type { getHistoryParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface getHistoryRequest extends Request {
  body: getHistoryParams;
}

const config = functions.config();

export const getHistory = async (req: getHistoryRequest, res: Response) => {
  const { cursor, excludePayload, limit } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.getHistory({
      cursor,
      excludePayload,
      limit,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
