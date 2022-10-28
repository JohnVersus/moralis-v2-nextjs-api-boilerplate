import type { Request, Response } from "express";
import admin = require("firebase-admin");
const db = admin.firestore();
import type { StreamData } from "../../../types";
import * as functions from "firebase-functions";
import Moralis from "moralis";
const config = functions.config();

interface StreamDataRequest extends Request {
  body: StreamData;
}

export const getUserStreams = async (req: StreamDataRequest, res: Response) => {
  await Moralis.start({ apiKey: config.moralis.api_key });
  const { body, headers } = req;
  try {
    const data = Moralis.Streams.verifySignature({
      body,
      signature: `${headers["x-signature"]}`,
    });
    if (!data) {
      throw new Error("Not a Moralis Stream");
    }
    // Sub collections List
    const {
      txs,
      abi,
      erc20Approvals,
      txsInternal,
      erc20Transfers,
      nftTransfers,
      logs,
    } = body;
    const { ERC1155, ERC721 } = body.nftApprovals;

    const { chainId, streamId, retries, tag, confirmed, block } = body;
    console.log({
      txs,
      chainId,
      streamId,
      retries,
      tag,
      confirmed,
      block,
    });
    await db
      .collection("Web3Streams")
      .doc(`${tag}-${streamId}`)
      .set({ retries });

    if (txs.length) {
      await db
        .collection("Web3Streams")
        .doc(`${tag}-${streamId}`)
        .collection("txs")
        .doc()
        .set({ txs, txsInternal, chainId, block, confirmed, logs });
    }
    if (erc20Approvals.length) {
      await db
        .collection("Web3Streams")
        .doc(`${tag}-${streamId}`)
        .collection("erc20Approvals")
        .doc()
        .set({ erc20Approvals, txsInternal, abi, block, confirmed, logs });
    }
    if (erc20Transfers.length) {
      await db
        .collection("Web3Streams")
        .doc(`${tag}-${streamId}`)
        .collection("erc20Transfers")
        .doc()
        .set({ erc20Transfers, txsInternal, abi, block, confirmed, logs });
    }
    if (nftTransfers.length) {
      await db
        .collection("Web3Streams")
        .doc(`${tag}-${streamId}`)
        .collection("nftTransfers")
        .doc()
        .set({ nftTransfers, txsInternal, abi, block, confirmed, logs });
    }
    if (ERC1155.length) {
      await db
        .collection("Web3Streams")
        .doc(`${tag}-${streamId}`)
        .collection("ERC1155-Approvals")
        .doc()
        .set({ ERC1155, txsInternal, abi, block, confirmed, logs });
    }
    if (ERC721.length) {
      await db
        .collection("Web3Streams")
        .doc(`${tag}-${streamId}`)
        .collection("ERC721-Approvals")
        .doc()
        .set({ ERC721, txsInternal, abi, block, confirmed, logs });
    }

    res.status(200).send("Successful");
  } catch (error) {
    if (!(error instanceof Error)) {
      return;
    }
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

/* For Type ref */
// functions.firestore
//   .document("/cryptoUsers/{cryptoUser}")
//   .onCreate((snapshot, context) => {});
