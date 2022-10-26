import React from "react";
import { useSession } from "next-auth/react";
import { clientApiPost } from "../../../utils/apiPost";
import type { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";
import type { getWalletNFTsParams } from "../../../types/EvmApi";
import { Button } from "@web3uikit/core";
import { EvmChain } from "@moralisweb3/evm-utils";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import { AxiosError } from "axios";
import getConfig from "next/config";

export default function Test({
  userSession,
  chainData,
}: {
  userSession: CryptoUser;
  chainData: EvmChain;
}) {
  const { data: localSession } = useSession();
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  console.log("server", serverRuntimeConfig.SECRTE);
  console.log("public", publicRuntimeConfig.SECRTE);

  //test
  const test = async () => {
    if (userSession) {
      try {
        const options: getWalletNFTsParams = {
          address: userSession.user.address,
          chain: userSession.user.chainId,
          // address: "0x20665ea97f56A320bBE9470c750B22eFE7B20787",
          // chain: EvmChain.ETHEREUM,
          // tokenAddresses: ["0x29652C2e9D3656434Bc8133c69258C8d05290f41"],
        };
        const response = await clientApiPost(
          "api/EvmApi/nft/getWalletNFTs",
          options
        );
        console.log({ response });
        alert("Check console for response");
      } catch (e) {
        if (e instanceof AxiosError) {
          console.error(e.response?.data);
          alert(e.response?.data);
        }
      }
    }
  };
  const getFromdb = async () => {
    // await signOut(auth);
    try {
      const myCollection = collection(db, "cryptoUsers");
      const queriedData = query(
        myCollection,
        where("profileId", "==", userSession.user.profileId)
      );
      const data = await getDocs(queriedData);
      const processedData = data.docs.map((e) => {
        return { userData: e.data(), id: e.id };
      });
      console.log(processedData);
      alert("Check console for response");
    } catch (e) {
      alert(e);
      console.log("Check Firebase rules for permissions");
      console.error(e);
    }
  };
  return (
    <>
      <Button onClick={test} text={"API test"} />
      <Button onClick={getFromdb} text={"Firebase test"} />
    </>
  );
}
