import { useContext, useEffect, useState } from "react";
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

    const [clickedGroup, setClickedGroup] = useState({});
    const carrier= (id, name, logo)=>{
        setClickedGroup({id: id, name: name, logo: logo});
    }
    return ( 
        <>
            <section className="chats-section">
                <div className="chats-groups">
                        <Groups callback={carrier} />
                </div>
                <div className="chats-chat">
                        <Chat activeGroup={clickedGroup} />
               </div>
            </section>
        </>
     );
}
 
export default Chats;