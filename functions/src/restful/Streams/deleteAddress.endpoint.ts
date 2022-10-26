import Moralis from "moralis";
import type { deleteAddressParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface deleteAddressRequest extends Request {
  body: deleteAddressParams;
}

const config = functions.config();

export const deleteAddress = async (
  req: deleteAddressRequest,
  res: Response
) => {
  const { address, id, networkType } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.deleteAddress({
      address,
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
