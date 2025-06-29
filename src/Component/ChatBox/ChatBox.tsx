import "./ChatBox.scss";
import chat from "../Chat/Chat";
import list from "../List/List";
import Details from "../Details/Details";
import Chat from "../Chat/Chat";
import List from "../List/List";

const ChatBox = () => {
  return (
    <div className="chatSpace">
    <div className="container">
    <div className="chatBox">
      <List />
      <Chat />
      <Details />
    </div>
    </div>
    </div>
  );
};



export default ChatBox;
