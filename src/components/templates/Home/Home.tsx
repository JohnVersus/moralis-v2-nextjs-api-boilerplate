import React, { useEffect } from "react";
import styles from "../../../../styles/User.module.css";
import { useSession } from "next-auth/react";
import type { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";
import UserData from "../../element/userData/userData";
import type { getNativeBalanceResult } from "../../../types/EvmApi";
import { EvmChain } from "@moralisweb3/evm-utils";
import router from "next/router";
import Auth from "../../module/auth/auth";
import Test from "../../element/test/test";

export default function Home({
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
    if (localSession !== undefined && userSession !== undefined)
      if (
        localSession?.user.address !== userSession?.user.address ||
        localSession?.user.chainId !== userSession?.user.chainId
      ) {
        console.log("triggered pageRefresh");
        router.replace(router.asPath);
      }
  }, [localSession, userSession]);

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <UserData
          session={userSession}
          balance={balance}
          chainData={chainData}
        />
        <div className={styles.buttonsRow}>
          <Auth />
          {userSession && (
            <Test userSession={userSession} chainData={chainData} />
          )}
        </div>
      </div>
    </div>
  );
}
