<template>
    <div>
        <button @click="loginWithGoogle" class="btn btn-primary">Login with Google</button>
        <button @click="logoutWithGoogle" class="btn btn-primary">Logout with Google</button>
    </div>
</template>
  
<script setup>
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCF7KWmHTCHVdYxy7FgiQrTbyNeHarsQ9c",
    authDomain: "kkusa-17b6b.firebaseapp.com",
    projectId: "kkusa-17b6b",
    storageBucket: "kkusa-17b6b.appspot.com",
    messagingSenderId: "891183157653",
    appId: "1:891183157653:web:1950043a9bf66a871aa69c",
    measurementId: "G-48ETNM18MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginUserOnServer = async (uid, idToken) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
            uid
        };

        const response = await axios.post('http://127.0.0.1/auth/sign-in', { role: 'user' }, { headers });

        console.log("Server response >>", response);

        if (response.status === 201) {
            console.log('User data sent to the server successfully');
        } else {
            console.error('Failed to send user data to the server');
        }
    } catch (error) {
        console.error('Error sending user data to the server:', error);
    }
};

const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        const result = await signInWithPopup(auth, provider);
        const { uid } = result.user;
        const idToken = await result.user.getIdToken();

        console.log("uid >>", uid);
        console.log("idToken >>", idToken);

        await loginUserOnServer(uid, idToken);
    } catch (err) {
        console.error("Error >>", err);
    }
};

const logoutWithGoogle = async () => {
    try {
        await signOut(auth);
        console.log("User logged out.");
    } catch (err) {
        console.error("Error >>", err);
    }
};
</script>
  