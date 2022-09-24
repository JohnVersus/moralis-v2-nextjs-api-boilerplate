import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { getWalletTokenBalancesParams } from "../../../../src/types/EvmApi";

interface getWalletTokenBalancesRequest extends NextApiRequest {
  body: getWalletTokenBalancesParams;
}

export default async function handler(
  req: getWalletTokenBalancesRequest,
  res: NextApiResponse
) {
  const { address, chain, subdomain, toBlock, tokenAddresses } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
      subdomain,
      toBlock,
      tokenAddresses,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
