import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

const serviceKey = require("@/service_key.json");

let app: App;

app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceKey),
      })
    : getApp();

const adminDB = getFirestore(app);

export { app as adminApp, adminDB };
