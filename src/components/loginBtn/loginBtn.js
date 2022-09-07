import React from "react";
import { Button } from "@web3uikit/core";
import { signIn } from "next-auth/react";
import { clientApiPost } from "../../utils/apiPost";

export default function LoginBtn() {
  const authenticate = async () => {
    const provider = new _ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const signer = provider.getSigner();
    const userData = {
      address: accounts[0],
      chain: chainId,
      network: "evm",
    };
    const { message } = await clientApiPost(
      "api/auth/request-message",
      userData
    );
    const signature = await signer.signMessage(message);
    try {
      await signIn("credentials", { message, signature, redirect: false });
      push("/");
    } catch (e) {
      return;
    }
  };

  return (
    <Button
      text="Login"
      theme="primary"
      onClick={() => {
        authenticate();
      }}
    />
  );
}
