import * as functions from "firebase-functions";
import admin = require("firebase-admin");

const db = admin.firestore();

export const deleteUserDb = async (user: functions.auth.UserRecord) => {
  const userDoc = db.collection("cryptoUsers").doc(user.uid);
  await userDoc.delete();
};
/* For Type ref */
// functions.auth.user().onDelete((user) => {
//   user.uid;
// });
