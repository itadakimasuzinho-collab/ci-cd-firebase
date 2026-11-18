const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const required = ["apiKey", "authDomain", "projectId", "appId"];

for (const key of required) {
  if (!config[key]) {
    throw new Error(`Configuração ausente: ${key}`);
  }
}

if (!process.env.FIREBASE_TEST_EMAIL || !process.env.FIREBASE_TEST_PASSWORD) {
  throw new Error("Credenciais de teste do Firebase ausentes.");
}

async function runTest() {
  const app = firebase.initializeApp(config);

  try {
    const auth = app.auth();
    const db = app.firestore();

    const result = await auth.signInWithEmailAndPassword(
      process.env.FIREBASE_TEST_EMAIL,
      process.env.FIREBASE_TEST_PASSWORD
    );

    const user = result.user;
    const userRef = db.collection("users").doc(user.uid);

    await userRef.set({
      email: user.email,
      ciCdTest: true,
      updatedAt: new Date().toISOString()
    });

    const document = await userRef.get();

    if (!document.exists || document.data().ciCdTest !== true) {
      throw new Error("Falha ao verificar documento no Firestore.");
    }

    await userRef.delete();

    console.log("Firebase Authentication: aprovado.");
    console.log("Cloud Firestore: aprovado.");
  } finally {
    await app.delete();
  }
}

runTest().catch((error) => {
  console.error("Falha no teste de integração:", error);
  process.exitCode = 1;
});