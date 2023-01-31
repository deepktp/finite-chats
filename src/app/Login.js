import app from "../context/conn";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, on } from "firebase/auth"
import  { userContext } from "../context/user";

const Login = () => {
    const navigate= useNavigate();  
    
    useEffect(toChats, []);
    const App = useContext(app);
    const auth= getAuth(App);
    
    function toChats(){
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userContext(user);
                navigate("/chats");

            } else {
                navigate("/signup");
            }
          });
    }



    return ( 
        <>
            <p>Loging in......</p>
        </>
     );
}
 
export default Login;