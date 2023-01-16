const GroupsJoin = (props) => {
    
    var visibility = props.visibility;

    return ( 
        <>
            <div className={(visibility)?("groups-join-section"):("groups-join-section hide")}>
                <div>
                    <div className="groups-popup-close">
                        X
                    </div>
                    <h2>Join Group</h2>
                    <label>Group ID</label>
                    <input type="text" />
                    <button>Submit</button>
                </div>
            </div>
        </>
     );
}
 
export default GroupsJoin;