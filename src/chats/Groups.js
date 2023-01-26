import { useState, useContext, useEffect, version } from "react";
import GroupsCreate from "./GroupsCreate";
import GroupsJoin from "./GroupsJoin";
import FS from "../context/firestore"
import { getDoc, doc } from "firebase/firestore";
import {user} from "../context/user";

const Groups = (props) => {
    const clickedGroup= props.callback;
    const [groupsVisibality, setGroupsVisibality] = useState("list");
    const [activeGroup, setActiveGroup] = useState("100000");
    const [groups, setGroups] = useState([]);
    const fireStore= useContext(FS);
    const userInfo= useContext(user);
    const getGroups= async ()=>{
        if(userInfo){
            var document= await getDoc(doc(fireStore, "users", userInfo.uid));
            var groupsIds= document.data().groups;

            for (let i = 0; i < groupsIds.length; i++) {
                const id = groupsIds[i];
                var groupsData= await getGroupsData(id);
                setGroups(oldData=> [...oldData, groupsData]);
            }
            
        }
    
    }
    const getGroupsData= async (groupId)=>{
        if(userInfo){
            var document = await getDoc(doc(fireStore, "groups", groupId))
            return document.data();
        }
    
    }
    const groupClicked= (id, name, logo)=>{
        setActiveGroup(id);
        clickedGroup(id, name, logo);
    }
    useEffect(()=>{
        getGroups();
    }, [])

    return ( 
        <>
            <section className="groups-section">
                <div className="groups-app-logo">
                    <img src="/img/favicon.png" alt="Finite Chats Logo" />
                </div> 
                <div className="groups-search">
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="groups-top-buttons">
                    <button className="group-join" onClick={()=>setGroupsVisibality("join")}>
                        Join
                    </button>
                    <button className="group-create" onClick={()=>setGroupsVisibality("create")}>
                        Create
                    </button>
                </div>
                <div className={(groupsVisibality ==="join" || groupsVisibality ==="create" )?"groups-list": "groups-list hide"} >
                    <div className="show-groups-list" onClick={()=>setGroupsVisibality("list")}>
                        X
                    </div>
                    <div className={(groupsVisibality ==="create")?("groups-create-section"):("groups-create-section hide")}>
                        <GroupsCreate />
                    </div>
                    <div className={(groupsVisibality ==="join")?("groups-join-section"):("groups-join-section hide")}>
                        <GroupsJoin />
                    </div>
                </div>
                <div className={(groupsVisibality ==="list")?"groups-list": "groups-list hide"}>
                    { groups.map((group, index)=>(
                        <div className={(activeGroup==group.gid)?("group active-group"):("group")} 
                            onClick={()=>{groupClicked(group.gid, group.name, group.logo)}}
                            key={index}
                        >
                            
                            <div className="group-image">
                                <img src="/groups/1.jpg" />
                            </div>
                            <div className="group-info">
                                {group.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="groups-footer-button">
                    <button className="logout">
                        Logout
                    </button>
                </div>
            </section>
        </>
     );
}
 
export default Groups;