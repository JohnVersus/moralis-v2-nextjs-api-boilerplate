import React, { useEffect } from "react";
import styles from "../styles/User.module.css";
import { getSession, useSession } from "next-auth/react";
import LogoutBtn from "../src/components/element/logoutBtn/logoutBtn";
import { clientApiPost, serverApiPost } from "../src/utils/apiPost";
import type { Session } from "next-auth";
import type { Context } from "vm";
import type { CryptoUser } from "../pages/api/auth/[...nextauth]";
import type { uploadFolderParams } from "../src/types/EvmApi";
import UserData from "../src/components/element/userData/userData";
import { Button } from "@web3uikit/core";
import type { getNativeBalanceResult } from "../src/types/EvmApi";
import { EvmChain } from "@moralisweb3/evm-utils";
import router from "next/router";

export const getServerSideProps = async (context: Context) => {
  const session: Session | null = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/" } };
  }
  let balance;
  let chainData;

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

export default function UserPage({
  userSession,
  balance,
  chainData,
}: {
  userSession: CryptoUser;
  balance: getNativeBalanceResult;
  chainData: EvmChain;
}) {
  const { data: localSession } = useSession();

  useEffect(() => {
    if (
      (localSession as unknown as CryptoUser)?.user.address !==
        userSession.user.address ||
      (localSession as unknown as CryptoUser)?.user.chainId !==
        userSession.user.chainId
    ) {
      console.log("triggered pageRefresh");
      router.replace(router.asPath);
    }
  }, [localSession]);

  //test
  const test = async () => {
    if (userSession) {
      console.log(
        "address",
        (userSession as unknown as CryptoUser).user.address
      );
      const options: uploadFolderParams = {
        abi: [
          {
            path: "moralis/logo.jpg",
            content:
              "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3",
          },
        ],
      };
      const response = await clientApiPost(
        "api/EvmApi/storage/uploadFolder",
        options
      );
      console.log(response);
    }
  };
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <UserData
          session={userSession}
          balance={balance}
          chainData={chainData}
        />
        <div className={styles.buttonsRow}>
          <LogoutBtn />
          <Button onClick={test} text={"Test me"} />
        </div>
      </div>
    </div>
  );
}
