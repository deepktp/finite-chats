import { useState, useContext } from "react";
import firestore from "../context/firestore";
import { collection, getDoc, updateDoc} from "firebase/firestore"
import { user } from "../context/user";

const GroupsJoin = () => {

    const [groupPin, setGroupPin] = useState("");
    const [groupId, setGroupId] = useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const userInfo = useContext(user);
    const joinGroup= ()=>{
        if(parseInt(groupPin)> 9999 || parseInt(groupPin)< 1000){
            setError("Group PIN Should be of 4 digit Long [ex. 1234]");
            return false;
        }
        if(groupId>999999 || groupId<100001){
            setError("Group Id is Invalid");
        }

        getDoc(collection(firestore, "finite-chats", "groups", groupId)).then(gdata=>{
            console.log(gdata);
            if(gdata){
                getDoc(collection(firestore, "finite-chats", "users" , userInfo.uid)).then((udata)=>{
                    updateDoc(collection(firestore, "finite-chats", "users" , userInfo.uid), udata).then(()=>{
                        setMsg("Joined Group")
                    }).catch(err=>{
                        console.log(err)
                    })
                }).catch(err=>{
                    console.log(err)
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return ( 
        <>
            <div>
                <h2>Join Group</h2>
                <label>Group ID</label>
                <input type="number" onChange={(e)=>setGroupId(parseInt(e.target.value))}/>
                <label>Group PIN</label>
                <input type="number" placeholder="1234" onChange={(e)=>setGroupPin(parseInt(e.target.value))}/>
                <p className="error">{error}</p>
                <p className="msg">{msg}</p>
                <button>Submit</button>
            </div>
        </>
     );
}
 
export default GroupsJoin;