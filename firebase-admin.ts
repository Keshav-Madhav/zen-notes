import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const servicekey = JSON.parse(process.env.FIREBASE_SERVICE_KEY || '{}');

let app: App;

if(getApps().length === 0) {
  app = initializeApp({
    credential: cert(servicekey)
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };