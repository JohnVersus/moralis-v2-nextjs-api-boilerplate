import admin from "firebase-admin";
import serviceAccount from "./firebasePrivateKey.json";

if (!serviceAccount) throw new Error("Add firebasePrivateKey.json file under ");
let adminApp;
// console.log(admin.apps.length);
if (admin.apps.length === 0) {
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth(adminApp);
