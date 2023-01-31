import { useState, useEffect, useContext, Component } from "react";
import { user } from "../context/user";
import FS from "../context/firestore";
import {doc, addDoc, query, onSnapshot, limitToLast, collection, serverTimestamp, getDocs, orderBy} from "firebase/firestore";

var scrollHeight;
var totalScrollHeight;
var unSubscribeSnapshot;

const Chat = (props) => {

    /**
     *  userInfo - store data about user  
     *  clickedGroup - {state} - store information about active group
     *  chatMessages- {state} - store all messages of group 
     *  chatInput- {state} - store user message input
     *  unSubscribeSnapshot - store firestore listner {on active group change old listner should removed and new added}
     *
    */



    const userInfo= useContext(user);
    const fireStore= useContext(FS);
    const [clickedGroup, setClickedGroup] = useState({id: "", name: "", logo: ""});
    const [chatMessages, setchatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");


    /**
    *   get Current Scroll position of chat messages are and store them 
    *   
    *   @scrollHeight - Store current scroll Positon 
    *   @totalScrollHeight - Total or Max possible scroll height
    *   
    */

    const getScrollPosition= ()=>{
        scrollHeight= document.getElementsByClassName("chat-massages")[0].clientHeight+document.getElementsByClassName("chat-massages")[0].scrollTop;
        totalScrollHeight= document.getElementsByClassName("chat-massages")[0].scrollHeight;
        // setchatMessages([...chatMessages, {massagerId: userInfo.uid, massagerName: userInfo.name, data: chatInput}])
        setChatInput("");
        document.getElementById("chat-input-textarea").focus();
    }

    /**
    *   Anonymus Function
    *   
    *   Check if current scroll Posion of Chat Messages Are is at bottom
    *   
    *   if at Bottom 
    *               After Adding massage in chat are scroll it to Bottom 
    * 
    *   else 
    *               keep its scroll position
    */
    
    useEffect(()=>{
        var atBottom= true;
        (scrollHeight=== totalScrollHeight)? (atBottom=true) : (atBottom=false);

        if(atBottom){
            document.getElementsByClassName("chat-massages")[0].scrollTop= document.getElementsByClassName("chat-massages")[0].scrollHeight;
        }
    }, [chatMessages]);


    // const getMessages= (groupId)=>{
    //     getDocs(collection(fireStore, "groups", groupId, "messages"), orderBy("sendedAt"), limit(25)).then((querySnapshot)=>{
    //         querySnapshot.forEach((document)=>{
    //             console.log(doc.data(), "ss")
    //             // setchatMessages([...chatMessages, document.doc.data()]);
    //         })
    //     })
    // }


    /**
     * sendMessage 
     * 
     * used to send message to a group other info is taken from userInfo
     * 
     * @param {String} groupId - group id 100000 < groupId < 999999 i.e. gid, 100001
     * @param {String} message - message from user
     */
    const sendMessage= (groupId, message)=>{
        addDoc(collection(fireStore, "groups", groupId, "messages"), {
            senderId: userInfo.uid,
            senderName: userInfo.displayName,
            sendedAt: serverTimestamp(),
            data: message
        }).catch(error=>{
            console.log(error);
        })
    }


    const sendThisMessage= ()=>{
        sendMessage(clickedGroup.id, chatInput);
    }
    /** 
     *  called when props value change
     * 
     *  props contains active group id 
     * 
     *  if group is changed
     *      
     *      1. clear old groups messagees {chatMessages}
     *      2. unsubscribe old firestore snapshot {unSubscribeSnapshot}
     *      3. change clicked group info in state
     *      4. create a new listner for change in firestore
     *      5. update scroll postion data on new messages 
     *      6. update state of messages {chatMessages}
    */
    const onPropsChange= ()=>{
        if(props.activeGroup.id>100000 && props.activeGroup.id<999999 && props.activeGroup.id !== clickedGroup.id){
        
            setchatMessages([]);
        
            if(unSubscribeSnapshot){
                unSubscribeSnapshot();
            }
        
            setClickedGroup(props.activeGroup);

            var q= query(collection(fireStore, "groups", props.activeGroup.id, "messages"), orderBy("sendedAt"), limitToLast(25));
            
            unSubscribeSnapshot = onSnapshot(q, (querySnapshot)=>{
                var tempMsgs= [];
                if ( !querySnapshot.metadata.hasPendingWrites ){
                    querySnapshot.docChanges().forEach((change)=>{
                        tempMsgs.push(change.doc.data());
                    })
                }else{
                    // another snapshot before data write 
                }

                getScrollPosition();
                setchatMessages((oldValue)=> [...oldValue, ...tempMsgs]);
            })
        }
    }

    useEffect(onPropsChange , [props]);
    
    const componentMounted = ()=>{

    }
    
    const componentWillUnmount= ()=>{
        if(unSubscribeSnapshot){
            unSubscribeSnapshot();
        }
    
        console.log("unMounting")
    }
    
    useEffect(()=>{
        componentMounted();
        return componentWillUnmount;
    }, [])
    
    return ( 
        <>
            <div className={(clickedGroup.id<100001 || clickedGroup.id>999999)? "chat-section hide" : "chat-section"}>
                <div className="chat-top-info">
                    <div className="chat-group-logo">
                        <img  src={clickedGroup.logo} alt="missing"/>
                    </div>
                    <div className="chat-group-name">
                        {clickedGroup.name}
                    </div>
                    <div className="chat-group-menu">
                        ||
                    </div>
                </div>
                <div className="chat-main">
                    <div className="chat-massages">
                        <div className="scrollFix"></div>
                        
                        {chatMessages.map((msg, index)=>(
                            <div className="chat-massage" key={index}>
                                <div className={(msg.senderId==userInfo.uid)?("chat-massage-sender self"): ("chat-massage-sender other")} >
                                    <div className="massager">
                                        {(msg.senderId==userInfo.uid)?("you"): (msg.senderName)}
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
                                <input type="text" id="chat-input-textarea" 
                                    spellCheck="false"
                                    autoCapitalize="off"
                                    value={chatInput} 
                                    placeholder="Message..."
                                    disabled={clickedGroup.id<100000 || clickedGroup.id>999999}
                                    onChange={(e)=>setChatInput(e.target.value)} />
                            </div>
                            <div className="chat-send">
                                <button 
                                type="submit"
                                disabled={clickedGroup.id<100001 || clickedGroup.id>999999}
                                onClick={sendThisMessage}>Send</button>
                            </div>
                    </div>
                </div>
            </div>
            <div className={(clickedGroup.id<100001 || clickedGroup.id>999999)? "chat-section" : "chat-section hide" }>
                    <div className="temp-chat-msg">
                        Start Chating By Selecting a Group from the left <br />
                        Or <br />
                        Create a new group by clicking on the Create button <br />
                        Or <br />
                        Join a group by clicking on the Join button
                    </div>
            </div>
        </>
     );
}
 
export default Chat;