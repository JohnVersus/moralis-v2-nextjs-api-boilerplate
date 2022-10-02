import React from "react";
import { useSession } from "next-auth/react";
import { clientApiPost } from "../../../utils/apiPost";
import type { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";
import type { getWalletNFTsParams } from "../../../types/EvmApi";
import { Button } from "@web3uikit/core";
import { EvmChain } from "@moralisweb3/evm-utils";

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
        // chain: userSession.user.chainId,
        chain: 80001,
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
  return <Button onClick={test} text={"Test me"} />;
}
