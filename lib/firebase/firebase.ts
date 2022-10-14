import admin from "firebase-admin";
import serviceAccount from "./firebasePrivateKey.json";
import { ServiceAccount } from "firebase-admin";

if (!serviceAccount) throw new Error("Add firebasePrivateKey.json file under ");
let adminApp;
// console.log(admin.apps.length);
if (admin.apps.length === 0) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccount as unknown as ServiceAccount
    ),
  });
}

export const adminAuth = admin.auth(adminApp);
