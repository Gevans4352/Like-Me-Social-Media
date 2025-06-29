import ChatList from "./ChatList/ChatList";
import "./List.scss";
import UserInfo from "./UserInfo/UserInfo";

const List = ()=>{
    return(
        <div className="lists">
            <UserInfo/>
            <ChatList/>
        </div>
    );
}

export default List;