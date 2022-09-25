import React from "react";
import styles from "../../../../styles/User.module.css";
import { Typography } from "@web3uikit/core";
import type { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";
import type { getNativeBalanceResult } from "../../../types/EvmApi";
import { EvmChain } from "@moralisweb3/evm-utils";

export default function UserData({
  session,
  balance,
  chainData,
}: {
  session: CryptoUser;
  balance: getNativeBalanceResult;
  chainData: EvmChain;
}): JSX.Element {
  if (session) {
    return (
      <div className={styles.data}>
        <div className={styles.dataCell}>
          <Typography variant="subtitle2">Profile Id:</Typography>
          <div className={styles.address}>
            <Typography copyable variant="body16">
              {session?.user.profileId}
            </Typography>
          </div>
        </div>
        <div className={styles.dataCell}>
          <Typography variant="subtitle2">Account:</Typography>
          <div className={styles.address}>
            {/* account address */}
            <Typography copyable variant="body16">
              {session?.user.address}
            </Typography>
          </div>
        </div>
        <div className={styles.dataCell}>
          <Typography variant="subtitle2">Network:</Typography>
          <div className={styles.address}>
            <Typography variant="body16">{`${chainData?._chainlistData.name} - ${session?.user.chainId}`}</Typography>
          </div>
        </div>
        <div className={styles.dataCell}>
          <Typography variant="subtitle2">ExpTime:</Typography>
          <div className={styles.address}>
            <Typography variant="body16">
              {session?.user.expirationTime}
            </Typography>
          </div>
        </div>
        <div className={styles.dataCell}>
          <Typography variant="subtitle2">Native Balance:</Typography>
          <div className={styles.address}>
            <Typography variant="body16">
              {`${(Number(balance?.balance) / 1e18).toFixed(4)}
              ${chainData?._chainlistData.nativeCurrency.symbol}`}
            </Typography>
          </div>
        </div>
        {/* <div className={styles.dataCell}>
          <Typography variant="subtitle2">chainId:</Typography>
          <Typography variant="body16">{`${session?.user.chainId}`}</Typography>
        </div> */}
      </div>
    );
  } else {
    return <Typography variant="body16">No Active Session</Typography>;
  }
}
