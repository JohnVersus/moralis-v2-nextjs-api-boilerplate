import Moralis from "moralis";
import type { NextApiRequest, NextApiResponse } from "next";

// const future = new Date();
// future.setDate(future.getDate() + 7);

const TIME = new Date();
const future = new Date(
  TIME.getFullYear(),
  TIME.getMonth(),
  TIME.getDate() + 7,
  TIME.getHours(),
  TIME.getMinutes(),
  TIME.getSeconds(),
  TIME.getMilliseconds()
);
const DOMAIN = process.env.APP_DOMAIN;
const STATEMENT = "Please sign this message to confirm your identity.";
const URI = process.env.NEXTAUTH_URL;
const EXPIRATION_TIME = future.toISOString();
const NOT_BEFORE = TIME.toISOString();
const TIMEOUT = 30;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, chain, network } = req.body;

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    if (!DOMAIN || !URI) {
      throw new Error("Please add APP_DOMAIN in the .env.local");
    }

    const message = await Moralis.Auth.requestMessage({
      address: address,
      chain: chain,
      network: network,
      domain: DOMAIN,
      statement: STATEMENT,
      uri: URI,
      expirationTime: EXPIRATION_TIME,
      timeout: TIMEOUT,
      notBefore: NOT_BEFORE,

      // domain: "defi.finance",
      // chain: 1,
      // address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
      // statement: "Please confirm",
      // uri: "https://defi.finance/",
      // expirationTime: "2020-01-01T00:00:00.000Z",
      // notBefore: "2020-01-01T00:00:00.000Z",
      // resources: ["https://docs.moralis.io/"],
      // timeout: 15,
      // network: "evm",
    });
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
