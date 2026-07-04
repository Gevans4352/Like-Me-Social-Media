import "./Stories.scss";
import React, { useContext, useRef, useState } from "react";

import { AuthContext } from "../../Context/Autheciator";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { IoMdClose } from "react-icons/io";
import { TfiGallery } from "react-icons/tfi";
import { TiMicrophoneOutline } from "react-icons/ti";

import TextModal from "../TextModal/TextModal";
import RecorderModal from "../RecorderModal/RecorderModal";

// images
import boy from "./09a097ae-5ccc-4484-849f-e3d9e6599060.jpg";
import boys from "./Cute black boy.jpg";
import guy from "./abaccf68-af9c-4322-8ea0-ae54150d3461.jpg";
import gurlie from "./c787faa8-06ab-4f52-b6d7-fc24da1fdcf7.jpg";
import girlie from "./cd66c191-a237-401c-8e96-737ad2e89c62.jpg";
import gurlll from "./girls.jpg";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [openTextModal, setOpenTextModal] = useState(false);
  const [openRecorderModal, setOpenRecorderModal] = useState(false);

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  // TEMP STORIES
  const [stories, setStories] = useState([
    { id: 1, name: "feranmi", pics: boy },
    { id: 2, name: "Katrina Meyers", pics: gurlie },
    { id: 3, name: "Noah Nelson", pics: guy },
    { id: 4, name: "Treasure Sailor", pics: girlie },
    { id: 5, name: "Damilola Damain", pics: boys },
    { id: 6, name: "Alex Brandon", pics: gurlll },
  ]);

  // NAVIGATION (SAFE)
  const next = () => {
    setActiveIndex((prev) => Math.min(prev + 1, stories.length - 1));
  };

  const prev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  // CAMERA
  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setCameraStream(stream);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    uploadStoryImage(imageData);

    cameraStream?.getTracks().forEach((t) => t.stop());
    setCameraStream(null);
  };

  // IMAGE UPLOAD
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      uploadStoryImage(file);
    };

    input.click();
  };

  // ADD STORY (IMAGE)
  function uploadStoryImage(file: any) {
    const newStory = {
      id: Date.now(),
      name: currentUser?.username || "You",
      pics: URL.createObjectURL(file),
    };

    setStories((prev) => [newStory, ...prev]);
    setOpenModal(false);
  }

  // TEXT STORY
  function uploadStoryText(text: string) {
    const newStory = {
      id: Date.now(),
      name: currentUser?.username || "You",
      pics: boy, // placeholder (you can replace with canvas text render later)
    };

    setStories((prev) => [newStory, ...prev]);
    setOpenTextModal(false);
  }

  // AUDIO STORY
  function uploadRecorder(audio: Blob) {
    console.log("Audio received:", audio);
    setOpenRecorderModal(false);
  }

  return (
    <div className="Stories">
      {/* ADD STORY CARD */}
      <div className="story">
        <img src={currentUser?.profilePic} />
        <span>{currentUser?.username}</span>
        <button onClick={() => setOpenModal(true)}>+</button>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="storyModal">
          <div className="modalContent">
            <button onClick={handleImageUpload}>
              <TfiGallery />
            </button>

            <button onClick={handleOpenCamera}>
              <CameraAltOutlinedIcon />
            </button>

            <button onClick={() => setOpenTextModal(true)}>
              <CreateOutlinedIcon />
            </button>

            <button onClick={() => setOpenRecorderModal(true)}>
              <TiMicrophoneOutline />
            </button>

            <button onClick={() => setOpenModal(false)}>
              <IoMdClose />
            </button>
          </div>
        </div>
      )}

      {/* TEXT MODAL */}
      {openTextModal && (
        <TextModal
          onClose={() => setOpenTextModal(false)}
          onSubmit={uploadStoryText}
          initialColor=""
        />
      )}

      {/* RECORDER MODAL */}
      {openRecorderModal && (
        <RecorderModal
          onClose={() => setOpenRecorderModal(false)}
          onSubmit={uploadRecorder}
        />
      )}

      {/* CAROUSEL */}
      <div className="wrapperTwo">
        <MdKeyboardArrowLeft
          className="seederArrow Left"
          onClick={prev}
          style={{ display: activeIndex === 0 ? "none" : "block" }}
        />

        <div className="viewport">
          <div
            className="track"
            ref={trackRef}
            style={{
              transform: `translateX(-${activeIndex * 210}px)`,
            }}
          >
            {stories.map((story) => (
              <div className="story" key={story.id}>
                <img src={story.pics} />
                <span>{story.name}</span>
              </div>
            ))}
          </div>
        </div>

        <MdKeyboardArrowRight
          className="seederArrow Right"
          onClick={next}
          style={{
            display: activeIndex === stories.length - 1 ? "none" : "block",
          }}
        />
      </div>
    </div>
  );
};

export default Stories;
