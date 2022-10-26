import * as functions from "firebase-functions";

export const getUserStreams = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext<{
    cryptoUser: string;
  }>
) => {
  console.log(snapshot);
  console.log(context);
};

/* For Type ref */
functions.firestore
  .document("/cryptoUsers/{cryptoUser}")
  .onCreate((snapshot, context) => {});
