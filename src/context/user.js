import { createContext, useContext } from "react";
import { getAuth, getUser } from "firebase/auth";
import { conn } from "./conn";
const auth= getAuth(conn);

var user= createContext();

function userContext(userData) {
    user= createContext(userData);
    return true;
}


export { userContext, user};