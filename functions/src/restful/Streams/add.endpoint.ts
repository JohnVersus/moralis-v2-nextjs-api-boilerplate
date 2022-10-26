import Moralis from "moralis";
import type { addParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface addParamsRequest extends Request {
  body: addParams;
}

const config = functions.config();

export const add = async (req: addParamsRequest, res: Response) => {
  const {
    abi,
    advancedOptions,
    allAddresses,
    chains,
    description,
    includeContractLogs,
    includeInternalTxs,
    includeNativeTxs,
    networkType,
    tag,
    topic0,
    webhookUrl,
  } = req.body;

  await Moralis.start({ apiKey: config.moralis.api_key });

  try {
    const data = await Moralis.Streams.add({
      abi,
      advancedOptions,
      allAddresses,
      chains,
      description,
      includeContractLogs,
      includeInternalTxs,
      includeNativeTxs,
      networkType,
      tag,
      topic0,
      webhookUrl,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
};
