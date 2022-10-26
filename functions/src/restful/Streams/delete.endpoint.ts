import Moralis from "moralis";
import type { deleteParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface deleteRequest extends Request {
  body: deleteParams;
}

const config = functions.config();

export const deleteStream = async (req: deleteRequest, res: Response) => {
  const { id, networkType } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.delete({
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
};
