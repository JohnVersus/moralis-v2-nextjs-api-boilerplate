import React from "react";
import Home from "../src/components/templates/Home/Home";
import { getSession } from "next-auth/react";
import { serverApiPost } from "../src/utils/apiPost";
import { EvmChain } from "@moralisweb3/evm-utils";
import type { Session } from "next-auth";
import type { Context } from "vm";
import type { CryptoUser } from "./api/auth/[...nextauth]";
import type { getNativeBalanceResult } from "../src/types/EvmApi";

export const getServerSideProps = async (context: Context) => {
  const session: Session | null = await getSession(context);
  // if (!session) {
  //   return { redirect: { destination: "/" } };
  // }
  let balance = null;
  let chainData = null;

  if (session) {
    const options = {
      address: (session as unknown as CryptoUser).user.address,
      chain: (session as unknown as CryptoUser).user.chainId,
    };
    balance = await serverApiPost(
      "api/EvmApi/balance/getNativeBalance",
      options
    );
    const chainID = (session as unknown as CryptoUser).user.chainId;
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
  return (
    <Home userSession={userSession} balance={balance} chainData={chainData} />
  );
}
