import { useContext } from "react";
import { AuthContext } from "../../Context/Autheciator";
import "./Details.scss";
import { FaArrowDown, FaArrowUp, FaDownload } from "react-icons/fa6";
import jackson from "./jackson.jpg";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { auth } from "../../lib/firebase";

const Details = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="details">
      <div className="user">
        <img
          src={
            currentUser?.profilePic ||
            "https://via.placeholder.com/150?text=No+Photo"
          }
          alt="profile picture"
        />
        <h2>{currentUser?.username}</h2>
        <p>{currentUser?.profileDetails}</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <MdOutlineArrowDropUp className="stylingIcon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <MdOutlineArrowDropUp className="stylingIcon" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <MdOutlineArrowDropDown className="stylingIcon" />
          </div>
          <div className="photos">
            <div className="photoItems">
              <div className="photoDetail">
                <img src={jackson} alt="someImage" className="jackson" />
                <span>photo_2025_2.png</span>
              </div>
              <FaDownload className="downloadIcon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <MdOutlineArrowDropUp className="stylingIcon" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={() => auth.signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Details;
