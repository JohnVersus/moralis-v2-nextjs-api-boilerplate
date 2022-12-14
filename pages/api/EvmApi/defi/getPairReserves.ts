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
  const { chain, pairAddress, providerUrl, toBlock, toDate } = req.body;
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.defi.getPairReserves({
      chain,
      pairAddress,
      providerUrl,
      toBlock,
      toDate,
    });
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(400).json(error.message);
    }
  }
}
