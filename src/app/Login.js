import app from "../context/conn";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth"
import  { userContext } from "../context/user";

const Login = () => {
    const navigate= useNavigate();  
    
    useEffect(toChats, []);
    const App = useContext(app);
    const auth= getAuth(App);
    
    function toChats(){
        console.log(auth)
        const user= auth.currentUser;
        console.log(user)
        if(user){
            userContext(user);
            navigate("/chats");
        }else{
            // navigate("/signup");
        }
    }



    return ( 
        <>
            <p>Loging in......</p>
        </>
     );
}
 
export default Login;