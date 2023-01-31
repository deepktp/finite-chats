import { useContext, useEffect, useState } from "react";
import FB  from "../context/firestore";
import { doc, arrayUnion, setDoc, serverTimestamp, getDoc, updateDoc } from "firebase/firestore"
import { user } from "../context/user";
const GroupsCreate = () => {
    const userInfo= useContext(user);
    const firestore= useContext(FB);
    const [groupName, setGroupName] = useState("");
    const [groupPin, setGroupPin]= useState("");
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [newGroupId, setNewGroupId] = useState(100000);


    const createGroup = async() => {
        // let r = (Math.random()).toString(36).substring(2, 8);
        if(groupName.length<3 || groupName.length > 64){
            setError("Group Name Should be 3 to 64 Charctor Long");
            return false;
        }
        if(parseInt(groupPin)> 9999 || parseInt(groupPin)< 1000){
            setError("Group PIN Should be of 4 digit Long [ex. 1234]");
            return false;
        }
        setError("");
        var gid= "100002";
        var ginfo= await getDoc(doc(firestore, "groups", "newGroupInfo"));

        await setDoc(doc(firestore, "groups", gid), {
            gid: gid,
            name: groupName,
            pin: groupPin,
            description: "",
            logo: "",
            creator: {
                name: userInfo.displayName,
                uid: userInfo.uid,
                phone: userInfo.phoneNumber
            },
            createdAt: serverTimestamp(),
            members: [
                {   name: userInfo.displayName,
                    uid: userInfo.uid,
                    phone: userInfo.phoneNumber,
                    role: "admin",
                }
            ],
            events: [

            ]
        })
        updateDoc(doc(firestore, "users", userInfo.uid), {groups: arrayUnion(gid)}).then(()=>{
            setMsg(`Group Created ID: ${gid} And PIN: ${groupPin}`);
            setGroupName("");
            setGroupPin("");
        })

    }


    return ( 
        <>
            <div>
                <h2>Create Group</h2>
                <label>Group Name</label>
                <input type="text"  onChange={(e)=>setGroupName(e.target.value)}/>
                <label>Group PIN</label>
                <input type="number" pattern="\d{4}" placeholder="1234" onChange={(e)=>setGroupPin(parseInt(e.target.value))}/>
                <p className="error">{error}</p>
                <p className="msg">{msg}</p>
                <button onClick={createGroup}>Submit</button>
            </div>
        </>
     );
}
 
export default GroupsCreate;