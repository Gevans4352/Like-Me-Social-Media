import React, { useRef, useState } from "react";
import "./User.scss";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';
import TranslateIcon from '@mui/icons-material/Translate';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PinterestIcon from '@mui/icons-material/Pinterest';
import backgroundCover from "./youtube banner 1024 x 576.jpg";
import actualProfilePic from "./⋆ dark feminine energy ⋆ dark feminine aesthetic ⋆….jpg";
import Post from "../../Component/Post/Post";
import ImageCropper from "../../Component/ImageCropper";
import { getCroppedImg, blobToBase64 } from "../../helper";

const User = ()=>{
       const [profileImage, setProfileImage] = useState<string>(actualProfilePic);
    const [coverImage, setCoverImage] = useState<string>(backgroundCover);
    const [showCropper, setShowCropper] = useState(false);
    const [currentImage, setCurrentImage] = useState<string>("");
    const [imageType, setImageType] = useState<"profile" | "cover">("profile");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "profile" | "cover") => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCurrentImage(reader.result as string);
                setImageType(type);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = async (croppedAreaPixels: any) => {
        try {
            const croppedImage = await getCroppedImg(
                currentImage,
                croppedAreaPixels
            );
            
            if (croppedImage) {
                const base64Image = await blobToBase64(croppedImage);
                if (imageType === "profile") {
                    setProfileImage(base64Image);
                } else {
                    setCoverImage(base64Image);
                }
            }
            setShowCropper(false);
        } catch (error) {
            console.error("Error cropping image:", error);
        }
    };

    return(
        <div className="User">
           <div className="images">
            <img src={backgroundCover} alt="Background cover" className="cover"/>
            <img src={actualProfilePic} alt="Profile Pic" className="profilePic"/>
            <input 
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "cover")}
            style={{ display: 'none' }}
            ref={fileInputRef}
            />
            <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile")}
                style={{ display: 'none' }}
            />
           <button onClick={() => fileInputRef.current?.click()}>Change Cover</button>
            <button onClick={() => {const profileInput = document.querySelector('input[type="file"]:last-child') as HTMLInputElement;profileInput.click();}}>Change Profile</button>
           </div>
            {showCropper && (
                <div className="cropper-modal">
                    <ImageCropper 
                        uploadedImage={currentImage}
                        setImageProperties={handleCropComplete}
                    />
                    <button onClick={() => setShowCropper(false)}>Cancel</button>
                </div>
            )}
           <div className="profileContainer">
            <div className="userInfo">
                <div className="left">
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
                </div>
                <div className="center">
                    <span>Feranmi</span>
                    <div className="info">
                        <div className="item">
                            <PlaceIcon/> 
                            <span>Nigeria</span>
                        </div>
                        <div className="item">
                            <TranslateIcon/> 
                            <span>English</span>
                        </div>
                        <div className="buttons">
                            <button>Follow</button> 
                        </div>  
                    </div>
                </div>
                <div className="right">
                    <EmailOutlinedIcon/>
                    <MoreVertIcon/>
                </div>
                
            </div>
           </div>
           <Post post={{
                    id: 0,
                    name: "",
                    userId: 0,
                    profilePic: "",
                    desc: "",
                    img: undefined,
                    vid: undefined
                }}/>
        </div>

    )
}

export default User;