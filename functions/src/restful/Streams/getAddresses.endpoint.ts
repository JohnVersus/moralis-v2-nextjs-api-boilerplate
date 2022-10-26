import Moralis from "moralis";
import type { getAddressesParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface getAddressesRequest extends Request {
  body: getAddressesParams;
}

const config = functions.config();

export const getAddresses = async (req: getAddressesRequest, res: Response) => {
  const { id, networkType } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await config.getAddresses({
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
