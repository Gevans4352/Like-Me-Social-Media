import { useContext } from "react";
import { AuthContext } from "../../Context/Autheciator";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useGeolocation from "../useCreateLocation";
import useCreateDate from "../../Component/UseCreateDate";

import  useChat  from "../Chat/hook/useChat";
import MessageList from "../Chat/component/MessageList";
import ChatInput from "../Chat/component/ChatInput";

import "./Chat.scss";

const Chat = () => {
  const { currentUser } = useContext(AuthContext);
  const { location, loading } = useGeolocation();

  const {
    messages,
    text,
    setText,
    openEmoji,
    setOpenEmoji,
    endRef,
    handleSend,
    handleKeyDown,
    addEmoji,
  } = useChat();

  if (loading) return <p>Loading location...</p>;

  return (
    <div className="chats">
      {/* TOP */}
      <div className="top">
        <div className="user">
          <div className="texts">
            <span>{currentUser?.username}</span>
            <p>
              {location?.latitude}, {location?.longitude} |{" "}
              {useCreateDate(new Date())}
            </p>
          </div>
        </div>

        <div className="userIcons">
          <LocalPhoneOutlinedIcon />
          <VideocamOutlinedIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      {/* MESSAGES */}
      <MessageList messages={messages} endRef={endRef} />

      {/* INPUT */}
      <ChatInput
        text={text}
        setText={setText}
        openEmoji={openEmoji}
        setOpenEmoji={setOpenEmoji}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
        onEmoji={addEmoji}
      />
    </div>
  );
};

export default Chat;