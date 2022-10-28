import React, { useEffect, useState } from "react";
import { Typography } from "@web3uikit/core";
import type { CryptoUser } from "../../../../pages/api/auth/[...nextauth]";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { signOut } from "next-auth/react";

export default function FirebaseUser({
  session,
}: {
  session: CryptoUser;
}): JSX.Element {
  const {
    firebaseToken,
    profileId,
    expirationTime,
    chainId,
    signature,
    address,
  } = session.user;

  const [status, setStatus] = useState<string>("");
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  const authenticate = async () => {
    if (firebaseToken) {
      const signIn = await signInWithCustomToken(auth, firebaseToken)
        .then(async () => {
          const myCollection = collection(db, "cryptoUsers");
          const queriedData = query(
            myCollection,
            where("profileId", "==", profileId)
          );
          const data = await getDocs(queriedData);
          if (data.docs[0]) {
            const docRef = doc(db, "cryptoUsers", data.docs[0].id);
            await updateDoc(docRef, {
              expirationTime,
              chainId,
              signature,
            });
          }
        })
        .catch((e) => {
          console.log(e);
          signOut({
            redirect: false,
          });
        });
    }
  };

  const processFirebaseAuth = async () => {
    if (firebaseToken) {
      setStatus("Procession Firebase Authentication");
      await authenticate();
      setStatus("Connected to Firebase");
    } else {
      setStatus("Not connected to Firebase");
    }
  };

  useEffect(() => {
    console.log({ session, authStatus });
    processFirebaseAuth();
  }, [session, authStatus]);

  // This should be used to control session in production.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          console.log("Firebase auth state changed to true");
          setAuthStatus(true);
        } else {
          console.log("Firebase auth state changed to false");
          setAuthStatus(false);
          setStatus("Not connected to Firebase");
          // signOut({
          //   redirect: false,
          // });
        }
      } catch (e) {
        console.log(e);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Typography variant="body16">{status}</Typography>
    </>
  );
}
