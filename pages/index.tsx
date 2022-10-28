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

export const getServerSideProps = async (context: Context) => {
  const session: Session | null = await getSession(context);
  // if (!session) {
  //   return { redirect: { destination: "/" } };
  // }
  let balance = null;
  let chainData = null;

  if (session) {
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
