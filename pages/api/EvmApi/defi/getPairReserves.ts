import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getPairReservesParams } from "../../../../src/types/EvmApi";

interface getPairReservesRequest extends NextApiRequest {
  body: getPairReservesParams;
}

export default async function handler(
  req: getPairReservesRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.defi.getPairReserves({
      chain: req.body.chain,
      pairAddress: req.body.pairAddress,
      providerUrl: req.body.providerUrl,
      toBlock: req.body.toBlock,
      toDate: req.body.toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
