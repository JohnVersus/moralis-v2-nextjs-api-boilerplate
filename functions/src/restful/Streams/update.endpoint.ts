import Moralis from "moralis";
import type { updateParams } from "../../../types/Streams";
import type { Request, Response } from "express";
import * as functions from "firebase-functions";

interface updateRequest extends Request {
  body: updateParams;
}

const config = functions.config();

export const update = async (req: updateRequest, res: Response) => {
  const {
    abi,
    advancedOptions,
    allAddresses,
    chains,
    description,
    id,
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
    const data = await Moralis.Streams.update({
      abi,
      advancedOptions,
      allAddresses,
      chains,
      description,
      id,
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
