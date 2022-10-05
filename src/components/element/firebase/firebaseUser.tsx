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
    const signIn = await signInWithCustomToken(auth, firebaseToken).catch(
      (e) => {
        signOut({
          redirect: false,
        });
      }
    );
  };

  const addOrUpdateDb = async () => {
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
    } else {
      const addedDocs = await addDoc(myCollection, {
        profileId,
        expirationTime,
        chainId,
        signature,
        address,
      });
    }
  };

  const compareUserSession = async () => {
    if (firebaseToken) {
      const currentUser = auth.currentUser;
      if (currentUser?.displayName !== address) {
        setStatus("Procession Firebase Authentication");
        await authenticate();
      }
      setStatus("Updating database with session");
      await addOrUpdateDb();
      setStatus("Connected to Firebase");
    } else {
      setStatus("Not connected to Firebase");
    }
  };

  useEffect(() => {
    console.log({ session });
    compareUserSession();
  }, [session]);

  // This should be used to control session in production.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Typography variant="body16">{status}</Typography>
    </>
  );
}
