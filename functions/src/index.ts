import * as functions from "firebase-functions";
import { getUserStreams as getUserStreamsFunction } from "./reactive/Streams/getUserStreams.function";
import {
  add,
  addAddress,
  deleteStream,
  deleteAddress,
  getAddresses,
  getAll,
  getById,
  getHistory,
  parsedLogs,
  readSettings,
  retry,
  setSettings,
  update,
  updateStatus,
  verifySignature,
} from "./restful/Streams";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

module.exports = {
  // Firestore Triggers
  getUserStreams: functions.firestore
    .document("/cryptoUsers/{cryptoUser}")
    .onCreate(getUserStreamsFunction),

  // Morlais API endpoints
  streamsAdd: functions.https.onRequest(add),
  streamsAddAddress: functions.https.onRequest(addAddress),
  streamsDeleteStream: functions.https.onRequest(deleteStream),
  streamsDeleteAddress: functions.https.onRequest(deleteAddress),
  streamsGetAddresses: functions.https.onRequest(getAddresses),
  streamsGetAll: functions.https.onRequest(getAll),
  streamsGetById: functions.https.onRequest(getById),
  streamsGetHistory: functions.https.onRequest(getHistory),
  streamsParsedLogs: functions.https.onRequest(parsedLogs),
  streamsReadSettings: functions.https.onRequest(readSettings),
  streamsRetry: functions.https.onRequest(retry),
  streamsSetSettings: functions.https.onRequest(setSettings),
  streamsUpdate: functions.https.onRequest(update),
  streamsUpdateStatus: functions.https.onRequest(updateStatus),
  streamsVerifySignature: functions.https.onRequest(verifySignature),
};
