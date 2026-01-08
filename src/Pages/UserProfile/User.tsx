import { useContext, useEffect, useState } from "react";
import "./User.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import actualProfilePic from "./green background.jpg";
import Post from "../../Component/Post/Post";
import { AuthContext } from "../../Context/Autheciator";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { uploadImageToCloudinary } from "../../cloudinaryUpload";
import { formatMemberSince } from "../../Component/formatDate";

const User = () => {
  const [profileImage, setProfileImage] = useState<string>(actualProfilePic);
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [mainProfilePicChange, setMainProfilePicChange] = useState("");
  const [mainCoverChange, setMainCoverChange] = useState("");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [coverImage, setCoverImage] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };
  const handleBioUpdate = async () => {
    setIsLoading(true);
    try {
      await updateUserProfile({ bio: bio });
      setMainProfilePicChange("Your bio has been updated");
    } catch (err) {
      console.error("Bio update failed:", err);
      alert("Bio update failed: " + err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCoverAvatar = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleProfileChange = () => {
    setOpenModal(true);
  };

  const handleProfilePicture = async () => {
    try {
      let mainProfilePicUrl = "";
      if (avatar.file) {
        mainProfilePicUrl = await uploadImageToCloudinary(avatar.file);

        console.log("Uploaded to Cloudinary:", mainProfilePicUrl);
        await updateUserProfile({ profilePic: mainProfilePicUrl });
      }
      setMainProfilePicChange("Your profile picture has been changed");
      setAvatar({ file: null, url: "" });
      console.log("User prfile pic changed successfully:");
    } catch (err) {
      console.error("Profile pic change failed:", err);
      alert("Profile pic change: " + err);
    }
  };

  const handleCoverPicture = async () => {
    try {
      let coverPicUrl = "";
      if (coverImage.file) {
        coverPicUrl = await uploadImageToCloudinary(coverImage.file);
        console.log("Uploaded cover to Cloudinary:", coverPicUrl);

        await updateUserProfile({ backgroundCover: coverPicUrl });
      }
      setMainCoverChange("Your cover photo has been changed");
      setOpenModal(false);
      setCoverImage({ file: null, url: "" });

      console.log("User cover pic changed successfully");
    } catch (err) {
      console.error("Cover pic change failed:", err);
      alert("Cover pic change failed: " + err);
    }
  };
  const handleRemoveProfilePic = () => {
    setAvatar({ file: null, url: "" });
  };

  const handleRemoveCoverPic = () => {
    setCoverImage({ file: null, url: "" });
  };
  return (
    <div className="User">
      {openModal && (
        <div className="changeProfileImageModal">
          <div className="profileImageContent">
            <button onClick={() => setOpenModal(false)}>
              <IoMdClose />
            </button>
            <div className="edit-profile-container">
              <div className="section">
                <div className="image-box">
                  <img src={avatar.url} alt="Profile" className="profile-img" />
                </div>
                <div className="info">
                  <h3>Profile Photo</h3>
                  <p>Square image, recommended 400x400px</p>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleAvatar}
                    accept="image/*"
                  />
                  <div className="buttons">
                    <button
                      onClick={() => document.getElementById("file")?.click()}
                      className="change"
                    >
                      Change Profile Photo
                    </button>
                    {avatar.url && (
                      <button onClick={handleProfilePicture}>
                        Save Profile Photo
                      </button>
                    )}
                    <button className="remove" onClick={handleRemoveProfilePic}>
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>

              {mainProfilePicChange && (
                <div className="profilechange-banner">
                  <span className="profilechange-icon">✓</span>
                  <span className="profilechange-message">
                    {mainProfilePicChange}
                  </span>
                  <button
                    className="profilechange-close"
                    onClick={() => setMainProfilePicChange("")}
                  >
                    ✖
                  </button>
                </div>
              )}
              {mainCoverChange && (
                <div className="profilechange-banner">
                  <span className="profilechange-icon">✓</span>
                  <span className="profilechange-message">
                    {mainCoverChange}
                  </span>
                  <button
                    className="profilechange-close"
                    onClick={() => setMainCoverChange("")}
                  >
                    ✖
                  </button>
                </div>
              )}
              <div className="section">
                <div className="image-box">
                  <img
                    src={coverImage.url}
                    alt="Header"
                    className="header-img"
                  />
                </div>
                <div className="info">
                  <h3>Header Photo</h3>
                  <p>Wide banner image, 3:1 ratio (1920x640px)</p>
                  <input
                    type="file"
                    id="coverFile"
                    style={{ display: "none" }}
                    onChange={handleCoverAvatar}
                    accept="image/*"
                  />
                  <div className="buttons">
                    <button
                      onClick={() =>
                        document.getElementById("coverFile")?.click()
                      }
                      className="change"
                    >
                      Change Header Photo
                    </button>
                    {coverImage.url && (
                      <button onClick={handleCoverPicture}>
                        Save Header Photo
                      </button>
                    )}
                    <button className="remove" onClick={handleRemoveCoverPic}>
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="info" style={{ width: "100%" }}>
                  <h3>Bio</h3>
                  <p>Tell people about yourself</p>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Aesthetic digital creator, coffee lover, cat mom..."
                    maxLength={150}
                    rows={4}
                  />
                  <small>{bio.length}/150 characters</small>
                  {bio !== currentUser?.bio && (
                    <button
                      onClick={handleBioUpdate}
                      className="save-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="loading-branches">
                          <div className="branch"></div>
                          <div className="branch"></div>
                          <div className="branch"></div>
                          <div className="branch"></div>
                          <div className="branch"></div>
                        </div>
                      ) : (
                        "Save Bio"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {mainProfilePicChange && (
        <div className="registered-banner">
          <span className="registered-icon">✓</span>
          <span className="registered-message">{mainProfilePicChange}</span>
          <button
            className="registered-close"
            onClick={() => setMainProfilePicChange("")}
          >
            ✖
          </button>
        </div>
      )}
      <div className="images">
        <img
          src={currentUser?.backgroundCover || actualProfilePic}
          alt="Background cover"
          className="cover"
        />
        <img
          src={currentUser?.profilePic}
          alt="Profile Pic"
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="center">
            <h2>{currentUser?.username}</h2>
            {currentUser?.bio && <p className="bio">{currentUser.bio}</p>}
            <span>{formatMemberSince(currentUser?.createdAt || "")}</span>
          </div>

          <div className="right">
            <EmailOutlinedIcon />
            <button className="moreInfos" onClick={() => handleProfileChange()}>
              <HiMiniQuestionMarkCircle />
            </button>
          </div>
          {/* <div className="left">
                    <a href="http://facebook.com">
                       <FacebookOutlinedIcon fontSize="large"/>
                    </a>
                    <a href="https://www.instagram.com/"  >
                       <InstagramIcon  fontSize="large"/>
                    </a>
                    <a href="https://www.linkedin.com/" >
                       <LinkedInIcon fontSize="large"/>
                    </a>
                    <a href="https://x.com/" >
                       <XIcon fontSize="large"/>
                    </a>
                    <a href="https://www.pinterest.com/" >
                       <PinterestIcon fontSize="large"/>
                    </a>
                </div> */}
        </div>
      </div>
      <Post
        post={{
          id: 0,
          name: "",
          userId: 0,
          profilePic: "",
          desc: "",
          img: undefined,
          vid: undefined,
        }}
      />
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default User;
