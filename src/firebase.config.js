import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBTf5u5nacQbTCl-cxj5H4foOaI9EkvBns",
    authDomain: "fir-auth-52ba1.firebaseapp.com",
    projectId: "fir-auth-52ba1",
    storageBucket: "fir-auth-52ba1.firebasestorage.app",
    messagingSenderId: "1014652801953",
    appId: "1:1014652801953:web:0a6e300ea82b67ead671e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);

export { auth, loginWithGoogle, logout };