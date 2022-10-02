import React, { useEffect, useState } from "react";
import { Button, Row, Typography } from "@web3uikit/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { clientApiPost } from "../../../utils/apiPost";
import { ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";
import { useRouter } from "next/router";
import { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";

export default function LoginBtn() {
  const [ethereum, setEthereum] = useState<ExternalProvider>();
  const { data: session, status } = useSession();
  const [authStatus, setAuthStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    setEthereum(global.window.ethereum);
  }, []);

  useEffect(() => {
    if (ethereum && session) {
      (ethereum as any).removeAllListeners();

      (ethereum as any).on("accountsChanged", (account: string[]) => {
        console.log("Trigger account change");
        if (
          account.length > 0 &&
          (session as unknown as CryptoUser)
          // for Special Case where user manually disconnects from metamask
          // (session as unknown as CryptoUser).user.address === account[0]
        ) {
          setAuthStatus("Changing Account");
          authenticate();
        } else {
          logOut();
        }
      });
      (ethereum as any).on("chainChanged", (chain: string) => {
        console.log("Trigger chain change");
        console.log(session, status);
        if (chain && session) {
          setAuthStatus("Changing Chain");
          authenticate();
        } else {
          logOut();
        }
      });
    }
    return () => {
      if (ethereum) {
        (ethereum as any).removeListener("accountsChanged", () => {});
        (ethereum as any).removeListener("chainChanged", () => {});
        // (ethereum as any).removeAllListeners();
      }
    };
  }, [ethereum, session]);

  const addListeners = () => {
    if (ethereum) {
      (ethereum as any).on("accountsChanged", (account: string[]) => {
        if (account.length > 0) {
          setAuthStatus("Changing Account");
          console.log(account);
          authenticate();
        } else {
          logOut();
        }
      });
      (ethereum as any).on("chainChanged", (account: string[]) => {
        console.log(account);
        if (account.length > 0) {
          setAuthStatus("Changing Chain");
          console.log(account);
          authenticate();
        } else {
          logOut();
        }
      });
    }
  };

  const removeListeners = () => {
    if (ethereum) {
      (ethereum as any).removeAllListeners();
    }
  };

  useEffect(() => {
    session !== undefined && setAuthStatus("");
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

  const logOut = () => {
    signOut({
      redirect: false,
    });
    removeListeners();
  };

  return (
    <>
      {session && status === "authenticated" ? (
        <Button
          text={`${authStatus ? authStatus : "Logout"}`}
          theme="outline"
          disabled={authStatus ? true : false}
          onClick={() => logOut()}
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
