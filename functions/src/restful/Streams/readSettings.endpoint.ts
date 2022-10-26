import Moralis from "moralis";
import type { readSettingsParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface readSettingsRequest extends Request {
  body: readSettingsParams;
}

const config = functions.config();

export const readSettings = async (req: readSettingsRequest, res: Response) => {
  const {} = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.readSettings();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
