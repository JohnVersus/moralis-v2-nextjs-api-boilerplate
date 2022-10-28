import React from "react";
import { useSession } from "next-auth/react";
import { clientApiPost } from "../../../utils/apiPost";
import type { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";
import type {
  getWalletNFTsParams,
  uploadFolderParams,
} from "../../../types/EvmApi";
import { Button } from "@web3uikit/core";
import { EvmChain } from "@moralisweb3/evm-utils";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  collectionGroup,
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
  // const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  // console.log("server", serverRuntimeConfig.SECRTE);
  // console.log("public", publicRuntimeConfig.SECRTE);

  //test
  const test = async () => {
    if (userSession) {
      try {
        // const options: getWalletNFTsParams = {
        //   address: userSession.user.address,
        //   chain: userSession.user.chainId,
        // };
        // const response = await clientApiPost(
        //   "api/EvmApi/nft/getWalletNFTs",
        //   options
        // );
        const options: uploadFolderParams = {
          abi: [
            {
              path: "example.json",
              content: `${{ a: btoa("2") }}`,
            },
          ],
        };
        const response = await clientApiPost(
          "api/EvmApi/ipfs/uploadFolder",
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
      const queriedData = collection(db, "Web3Streams");
      // const myCollection = collection(db, "cryptoUsers");
      // const queriedData = query(
      //   myCollection,
      //   where("profileId", "==", userSession.user.profileId)
      // );
      const data = await getDocs(queriedData);
      const docs = data.docs.map(async (e) => {
        return { userData: e.data(), id: e.id };
      });
      console.log({ docs });

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
