const GroupsCreate = () => {
    return ( 
        <>
            <div className={(visibility)?("groups-create-section"):("groups-create-section hide")}>
                <div>
                <div className="groups-popup-close">
                    X
                </div>
                    <h2>Create Group</h2>
                    <label>Group Name</label>
                    <input type="text" />
                    <button>Submit</button>
                </div>
            </div>
        </>
     );
}
 
export default GroupsCreate;