import React, { useEffect } from "react";
import styles from "../styles/User.module.css";
import { getSession } from "next-auth/react";
import LogoutBtn from "../src/components/logoutBtn/logoutBtn";
import { clientApiPost, serverApiPost } from "../src/utils/apiPost";
import { Session } from "next-auth";
import { Context } from "vm";
// import { EvmChain } from "@moralisweb3/evm-utils";
import type { CryptoUser } from "./api/auth/[...nextauth]";
import type { uploadFolderParams } from "../src/types/EvmApi";

export const getServerSideProps = async (context: Context) => {
  const session: Session | null = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/" } };
  }
  let data = "";

  if (session) {
    console.log("session", (session as unknown as CryptoUser).user.chainId);
    const options = {
      address: "0x7b9B6D511332712eFb9B252522Def88a2c9b5e8E",
      chain: (session as unknown as CryptoUser).user.chainId,
    };
    data = await serverApiPost("api/EvmApi/account/getNFTTransfers", options);
  }
  return {
    props: { userSession: session, data },
  };
};

export default function Home({
  userSession,
  data,
}: {
  userSession: Session;
  data: JSON;
}) {
  console.log(userSession);
  console.log(data);

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
        <div className={styles.buttonsRow}>
          <LogoutBtn />
          <button onClick={test}>Test me</button>
        </div>
      </div>
    </div>
  );
}
