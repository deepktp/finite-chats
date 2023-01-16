import GroupsCreate from "./GroupsCreate";
import GroupsJoin from "./GroupsJoin";

const Groups = () => {

    const [groupsCreateStatus, setGroupsCreateStatus] = useState(false);
    const [groupsJoinStatus, setGroupsJoinStatus] = useState(false);
    return ( 
        <>
            <section className="groups-section">
                <div className="groups-app-logo">
                    <img src="/img/favicon.png" alt="Finite Chats Logo" />
                </div> 
                <div className="groups-search">
                    <input type="text" />
                </div>
                <div className="groups-top-buttons">
                    <button className="group-join" onClick={setGroupsJoinStatus(true)}>
                        Join
                    </button>
                    <button className="group-create" onClick={setGropusCreateStatus(true)}>
                        Create
                    </button>
                </div>
                <div className="groups-list">
                    <div className="group">
                        <div className="group-image">
                            <img src="/groups/1.jpg" />
                        </div>
                        <div className="group-info">
                            Dev Ops
                        </div>
                    </div>
                    <div className="group">
                        <div className="group-image">
                            <img src="/groups/1.jpg" />
                        </div>
                        <div className="group-info">
                            Dev Ops
                        </div>
                    </div>
                    <div className="group">
                        <div className="group-image">
                            <img src="/groups/1.jpg" />
                        </div>
                        <div className="group-info">
                            Dev Ops
                        </div>
                    </div>
                    <div className="group">
                        <div className="group-image">
                            <img src="/groups/1.jpg" />
                        </div>
                        <div className="group-info">
                            Dev Ops
                        </div>
                    </div>
                    <div className="group">
                        <div className="group-image">
                            <img src="/groups/1.jpg" />
                        </div>
                        <div className="group-info">
                            Dev Ops
                        </div>
                    </div>
                    <div className="group">
                        <div className="group-image">
                            <img src="/groups/1.jpg" />
                        </div>
                        <div className="group-info">
                            Dev Ops
                        </div>
                    </div>                    
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