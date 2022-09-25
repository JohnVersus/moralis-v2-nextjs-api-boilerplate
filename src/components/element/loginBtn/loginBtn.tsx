import React, { useEffect, useState } from "react";
import { Button, Row, Typography } from "@web3uikit/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { clientApiPost } from "../../../utils/apiPost";
import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";

export default function LoginBtn() {
  const [ethereum, setEthereum] = useState<ExternalProvider>();
  const { data: session, status } = useSession();
  const [authStatus, setAuthStatus] = useState("");

  useEffect(() => {
    setEthereum(global.window.ethereum);
  }, []);

  useEffect(() => {
    if (ethereum) {
      (ethereum as any).removeAllListeners();
      (ethereum as any).on("accountsChanged", () => {
        setAuthStatus("Changing Account");
        authenticate();
      });
      (ethereum as any).on("chainChanged", () => {
        setAuthStatus("Changing Chain");
        authenticate();
      });
    }
  }, [ethereum]);

  useEffect(() => {
    session && setAuthStatus("");
  }, [session]);

  const authenticate = async () => {
    const ethereum = global.window.ethereum;
    if (!ethereum?.request) throw new Error("No Ethereum Window Found");
    const provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const chainId = await ethereum?.request({
      method: "eth_chainId",
    });
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
    setAuthStatus("Sign Signature");
    const signature = await signer.signMessage(message);
    setAuthStatus("Processing");
    try {
      await signIn("credentials", { message, signature, redirect: false });
    } catch (e) {
      return;
    }
  };

  return (
    <>
      {session && status === "authenticated" ? (
        <Button
          text={`${authStatus ? authStatus : "Logout"}`}
          theme="outline"
          disabled={authStatus ? true : false}
          onClick={() =>
            signOut({
              redirect: false,
            })
          }
        />
      ) : (
        <Button
          text={`${authStatus ? authStatus : "Login"}`}
          theme="primary"
          disabled={authStatus ? true : false}
          onClick={() => {
            authenticate();
          }}
        />
      )}
    </>
  );
}
