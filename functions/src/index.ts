import * as functions from "firebase-functions";
import admin = require("firebase-admin");
// PS: Dont include initalizeApp in any other file
admin.initializeApp();
// Add API to firebase congig using this command
// firebase functions:config:set moralis.api_key="THE API KEY"
import {
  addUserDb,
  deleteUserDb,
  addUserStream,
  deleteUserStream,
} from "./reactive";
import { getUserStreams } from "./restful";

module.exports = {
  // choose the closest region and match with moralis stream setting
  // Auth Triggers
  addUserDb: functions
    .region("us-east1")
    .runWith({ timeoutSeconds: 180 })
    .auth.user()
    .onCreate(addUserDb),

  deleteUserDb: functions
    .region("us-east1")
    .runWith({ timeoutSeconds: 180 })
    .auth.user()
    .onDelete(deleteUserDb),

  addUserStream: functions
    .region("us-east1")
    .runWith({ timeoutSeconds: 180 })
    .auth.user()
    .onCreate(addUserStream),

  deleteUserStream: functions
    .region("us-east1")
    .runWith({ timeoutSeconds: 180 })
    .auth.user()
    .onDelete(deleteUserStream),

  // Firestore Triggers
  getUserStreams: functions
    .region("us-east1")
    .runWith({ timeoutSeconds: 180 })
    .https.onRequest(getUserStreams),
};
