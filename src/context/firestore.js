import { getFirestore } from "firebase/firestore";
import { createContext } from "react";
import {conn} from "./conn";


export default  createContext(getFirestore(conn));