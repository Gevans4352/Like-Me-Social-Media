import "./ChatBox.scss";
import { useContext } from "react";
import { AuthContext } from "../../Context/Autheciator"
import Chat from "../Chat/Chat";
import List from "../List/List";
import Details from "../Details/Details";
import Login from "../../Pages/LoginPage/Login";
import Notification from "../Notification/Notification";

const ChatBox = () => {
  const { currentUser } = useContext(AuthContext); 
  return (
    <div className="container">
      {currentUser ? (
        <div className="chatSpace">
          <div className="container">
            <div className="chatBox">
              <List />
              <Chat />
              <Details />
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <Notification/>
    </div>
  );
};

export default ChatBox;
