import React from "react";
import Home from "../src/components/templates/Home/Home";
import { getSession, useSession } from "next-auth/react";
import { serverApiPost } from "../src/utils/apiPost";
import { EvmChain } from "@moralisweb3/evm-utils";
import type { Session } from "next-auth";
import type { Context } from "vm";
import type { CryptoUser } from "./api/auth/[...nextauth]";
import type {
  getNativeBalanceResult,
  getNativeBalanceParams,
} from "../src/types/EvmApi";
import type { addParams, addResult } from "../src/types/Streams";

export const getServerSideProps = async (context: Context) => {
  const session: Session | null = await getSession(context);
  // if (!session) {
  //   return { redirect: { destination: "/" } };
  // }
  let balance = null;
  let chainData = null;
  let database = process.env.NEXT_PUBLIC_DATABASE;
  let webhookUrl = null;

  switch (database) {
    case "mongo":
      webhookUrl = process.env.MONGODB_STREAMS_WEBHOOK_URL;
      break;

    case "firebase":
      webhookUrl = process.env.FIREBASE_STREAMS_WEBHOOK_URL;

    default:
      break;
  }

  const getStreamId = async (webhookUrl: string): Promise<string | null> => {
    if (webhookUrl) {
      const options: addParams = {
        // chains: [1, 137, 56, 43114, 250, 25],
        chains: [5, 11155111, 80001, 97, 43113, 338],
        webhookUrl,
        description: "User Wallet syncs",
        tag: "Testnet wallet streams",
        includeNativeTxs: true,
      };
      const stream: addResult = await serverApiPost("api/Streams/add", options);
      console.log(stream);
      return stream.id;
    }
    return null;
  };

  if (session) {
    if (webhookUrl) {
      const streamId = await getStreamId(webhookUrl);

      if (streamId) {
        console.log(streamId);
      }
    }

    const options: getNativeBalanceParams = {
      address: session.user.address,
      chain: session.user.chainId,
    };
    balance = await serverApiPost(
      "api/EvmApi/balance/getNativeBalance",
      options
    );
    const chainID = session.user.chainId;
    chainData = await serverApiPost("api/utils/getChainData", chainID);
  }
  return {
    props: { userSession: session, balance, chainData },
  };
};

export default function Index({
  userSession,
  balance,
  chainData,
}: {
  userSession: CryptoUser;
  balance: getNativeBalanceResult;
  chainData: EvmChain;
}) {
  const data = useSession();
  data.data?.user;
  return (
    <Home userSession={userSession} balance={balance} chainData={chainData} />
  );
}
