import Moralis from "moralis";
import type { getAllParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface getAllRequest extends Request {
  body: getAllParams;
}

const config = functions.config();

export const getAll = async (req: getAllRequest, res: Response) => {
  const { cursor, limit, networkType } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.getAll({
      cursor,
      limit,
      networkType,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
