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

export default function Test({
  userSession,
  chainData,
}: {
  userSession: CryptoUser;
  chainData: EvmChain;
}) {
  const { data: localSession } = useSession();

  //test
  const test = async () => {
    if (userSession) {
      const options: getWalletNFTsParams = {
        address: userSession.user.address,
        chain: userSession.user.chainId,
      };
      console.log(options);
      const response = await clientApiPost(
        "api/EvmApi/nft/getWalletNFTs",
        options
      );
      console.log({ response });
      alert("Check console for response");
    }
  };
  const getFromdb = async () => {
    // await signOut(auth);
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
  };
  return (
    <>
      <Button onClick={test} text={"API test"} />
      <Button onClick={getFromdb} text={"Firebase test"} />
    </>
  );
}
