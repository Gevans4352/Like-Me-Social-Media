import "./Stories.scss"
import React, { useContext, useRef, useState } from "react"
import boy from "./09a097ae-5ccc-4484-849f-e3d9e6599060.jpg";
import boys from "./Cute black boy.jpg";
import guy from "./abaccf68-af9c-4322-8ea0-ae54150d3461.jpg";
import gurlie from "./c787faa8-06ab-4f52-b6d7-fc24da1fdcf7.jpg";
import girlie from "./cd66c191-a237-401c-8e96-737ad2e89c62.jpg";
import gurlll from "./girls.jpg";
import { AuthContext } from "../../Context/Autheciator";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { IoMdClose } from "react-icons/io";
import { TfiGallery } from "react-icons/tfi";
import { TiMicrophoneOutline } from "react-icons/ti";
import TextModal from "../TextModal/TextModal";
import RecorderModal from "../RecorderModal/RecorderModal";

type TextModalProps = {
    onClose: () => void;
    onSubmit: (text: string) => void;
    initialColor: string;
}


const Stories = ()=>{
    const [isMoved, setIsMoved] = useState(false);
    const secondRef = useRef<HTMLDivElement>(null);
    const {currentUser} = useContext(AuthContext);
    const [slideNumberTwo, setSlideNumberTwo] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    let mediaRecorder: MediaRecorder;
    let audioChunks: BlobPart[] = [];
    const [openTextModal, setOpenTextModal] = useState(false);
    const [txtOpenModal, setTxtOpenModal] = useState(false);
    const [ openRecorderModal, setOpenRecorderModal] = useState(false);

    const handleOpenCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream);
            setOpenModal(false);
        } catch (error) {
            console.error("Camera error:", error);
        }
    };

    const handleAddText = () => {
        setTxtOpenModal(false); 
        setOpenTextModal(true);
    };

 

    // const handleRecordAudio = async () => {
    //     setOpenRecorderModal(false);
    //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //     mediaRecorder = new MediaRecorder(stream);
    //     mediaRecorder.start();
    //     audioChunks = [];
    //     mediaRecorder.ondataavailable = (e) => {
    //         audioChunks.push(e.data);
    //     };
    //     mediaRecorder.onstop = () => {
    //         const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
    //         uploadStoryAudio(audioBlob);
    //     };
    //     setTimeout(() => mediaRecorder.stop(), 30000); 
    // }

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
    const captureImage = () => {
        const video = videoRef.current;
        if (!video) return;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx?.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/jpeg");

  uploadStoryImage(imageData); // upload to Firebase

  cameraStream?.getTracks().forEach(track => track.stop());
  setCameraStream(null);
};





    //TEMPORARY DATA 
    const stories = [
    {
        id: 1,
        name: "feranmi",
        pics: boy
    }
    ,{   id: 2,
        name: "Katrina Meyers",
        pics: gurlie
    },
    {
        id: 3,
        name: "Noah Nelson",
        pics: guy
    },
    {
        id: 4,
        name: "Treasure Sailor",
        pics: girlie
    },
    {
        id: 5,
        name: "Damilola Damain",
        pics: boys
    },{
        id: 6,
        name: "Alex Brandon",
        pics: gurlll
    }
    ]
      const clickMe = (crossway: "left" | "right") => {
  if (!secondRef.current) return;

  const storyWidth = secondRef.current.children[0].clientWidth + 10;
  const maxIndex = stories.length - 1;

  let newIndex = slideNumberTwo;

  if (crossway === "left" && newIndex > 0) newIndex--;
  if (crossway === "right" && newIndex < maxIndex) newIndex++;

  secondRef.current.style.transform = `translateX(-${newIndex * storyWidth}px)`;
  setSlideNumberTwo(newIndex);
};


    function uploadStoryText(text: string): void {
        throw new Error("Function not implemented.");
    }

  function uploadRecorder(audio: Blob): void {
    console.log("RecorderModal opened! Audio will go here later:", audio);
}

return(
        <div className="Stories">
            {openModal && (
                <div className="storyModal">
                    <div className="modalContent">
                        <button onClick={() => handleImageUpload()}><TfiGallery /></button>
                        <button onClick={() => handleOpenCamera()}><CameraAltOutlinedIcon/></button>
                        <button onClick={() => handleAddText()}><CreateOutlinedIcon/></button>
                        <button onClick={() => setOpenRecorderModal(true)}><TiMicrophoneOutline /></button>
                        <button onClick={() => setOpenModal(false)}><IoMdClose /></button>
                    </div>
                </div>
            )}
            {openTextModal && (
                <TextModal 
                onClose={() => setOpenTextModal(false)}
                onSubmit={uploadStoryText} initialColor={""}                />
            )}
            {openRecorderModal && (
                <RecorderModal 
                onSubmit={uploadRecorder}  
                 onClose={() => setOpenRecorderModal(false)}           />
            )}
            <div className="story">
                <img src={currentUser?.profilePic} alt="story image" />
                <span>{currentUser?.username}</span>
                <button onClick={() => setOpenModal(true)}>+</button>
            </div>
         <div className="wrapperTwo">
            <MdKeyboardArrowLeft className="seederArrow Left" onClick={()=>clickMe("left")} style={{ display: !isMoved ? "none" : "block"}}/>
            <div className="wrap" ref={secondRef} style={{ display: 'flex', transition: 'transform 0.5s ease', gap: '10px' }}>
                {stories.map(story=>(
                    <div className="story" key={story.id}>
                        <img src={story.pics} alt="story image" />
                        <span>{story.name}</span>
                    </div>
                ))} 
            </div>
            <MdKeyboardArrowRight className="seederArrow Right" onClick={()=>clickMe("right")}/>
        </div>
    </div>
)

}


export default Stories;













