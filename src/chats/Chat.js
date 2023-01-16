import { useState, useEffect } from "react";
import { user } from "./user";





var scrollHeight;
var totalScrollHeight;

const Chat = () => {
    
    const [chatMassages, setChatMassages] = useState();
    const [chatInput, setChatInput] = useState("");
    const sendMassage= ()=>{
        scrollHeight= document.getElementsByClassName("chat-massages")[0].clientHeight+document.getElementsByClassName("chat-massages")[0].scrollTop;
        totalScrollHeight= document.getElementsByClassName("chat-massages")[0].scrollHeight;
        setChatMassages([...chatMassages, {massagerId: userInfo.uid, massagerName: userInfo.name, data: chatInput}])
        setChatInput("");
        document.getElementById("chat-input-textarea").focus();
    }
    useEffect(()=>{
        var atBottom= true;
        (scrollHeight=== totalScrollHeight)? (atBottom=true) : (atBottom=false);

        if(atBottom){
            document.getElementsByClassName("chat-massages")[0].scrollTop= document.getElementsByClassName("chat-massages")[0].scrollHeight;
        }
        console.log(atBottom)
    }, [chatMassages])
    
    return ( 
        <>
            <div className="chat-section">
                <div className="chat-top-info">
                    <div className="chat-group-logo">
                        <img  src="" alt="missing"/>
                    </div>
                    <div className="chat-group-name">
                        @@@@@@ Feture Devloper @@@@@@@
                    </div>
                    <div className="chat-group-menu">
                        ||
                    </div>
                </div>
                <div className="chat-main">
                    <div className="chat-massages">
                        <div className="scrollFix"></div>
                        
                        {chatMassages.map(msg=>(
                            <div className="chat-massage">
                                <div className={(msg.massagerId==userInfo.uid)?("chat-massage-sender self"): ("chat-massage-sender other")} >
                                    <div className="massager">
                                        {(msg.massagerId==userInfo.uid)?("you"): (msg.massagerName)}
                                    </div>
                                    <div className="massage-data">
                                        <p>
                                            {msg.data}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))

                        }
                    </div>
                </div>
                <div className="chat-bottom">
                    <div className="chat-input-area">
                        <div className="chat-input">
                            <textarea rows="3" id="chat-input-textarea" value={chatInput} onChange={(e)=>setChatInput(e.target.value)}></textarea>
                        </div>
                        <div className="chat-send">
                            <button onClick={sendMassage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Chat;