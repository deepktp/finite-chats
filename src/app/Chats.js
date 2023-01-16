import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { user } from "../context/user";
import Chat from "../chats/Chat";
import Groups from "../chats/Groups";

const Chats = () => {
    
    const userInfo= useContext(user);
    const navigate= useNavigate();

    useEffect(() => {
        if(userInfo){
            console.log(userInfo);
        }else{
            navigate("/login")
        }
    }, []);
    return ( 
        <>
            <section className="chats-section">
                <div className="chats-groups">
                        <Groups />
                </div>
                <div className="chats-chat">
                        <Chat />
               </div>
            </section>
        </>
     );
}
 
export default Chats;