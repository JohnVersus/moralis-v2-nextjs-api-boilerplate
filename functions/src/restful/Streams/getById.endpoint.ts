import Moralis from "moralis";
import type { getByIdParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface getByIdRequest extends Request {
  body: getByIdParams;
}

const config = functions.config();

export const getById = async (req: getByIdRequest, res: Response) => {
  const { id, network } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.getById({
      id,
      network,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
