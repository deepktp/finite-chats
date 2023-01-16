import { initializeApp } from "firebase/app";
import { createContext } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyCzSkAo0rFAsiyII7qGD93tNVpkIW4x7Wo",
    authDomain: "chat-with-react-bm.firebaseapp.com",
    projectId: "chat-with-react-bm",
    storageBucket: "chat-with-react-bm.appspot.com",
    messagingSenderId: "388425991839",
    appId: "1:388425991839:web:e92c15a31fc3ffb32a84aa"
};

const conn= initializeApp(firebaseConfig);
const app = createContext(conn);

export default app;
export {conn};