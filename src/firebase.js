import firebase from "firebase/compat/app";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async () => {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const userRef = collection(db, "users");
    const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
    if (result.empty) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
        });
    }
};

const signOut = () => {
    auth.signOut();
};

export { signInWithGoogle, signOut, auth, db };
export default firebase;
