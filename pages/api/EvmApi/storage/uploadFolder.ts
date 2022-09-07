import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import type { uploadFolderParams } from "../../../../src/types/EvmApi";

interface uploadFolderRequest extends NextApiRequest {
  body: uploadFolderParams;
}

export default async function handler(
  req: uploadFolderRequest,
  res: NextApiResponse
) {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  try {
    const data = await Moralis.EvmApi.storage.uploadFolder({
      abi: req.body.abi,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
