import * as functions from "firebase-functions";
import admin = require("firebase-admin");
const db = admin.firestore();

export const addUserDb = async (user: functions.auth.UserRecord) => {
  await db.collection("cryptoUsers").doc(user.uid).set({
    profileId: user.uid,
    address: user.displayName,
  });
};
/* For Type ref */
// functions.auth.user().onCreate((user) => {
//   user.uid;
// });
