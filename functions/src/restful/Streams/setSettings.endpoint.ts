import Moralis from "moralis";
import type { setSettingsParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface setSettingsRequest extends Request {
  body: setSettingsParams;
}

const config = functions.config();

export const setSettings = async (req: setSettingsRequest, res: Response) => {
  const { region } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.setSettings({
      region,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
