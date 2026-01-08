import React, { useCallback, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbLetterASmall, TbTypography } from "react-icons/tb";
import "./TextModal.scss";
import { FaBold } from "react-icons/fa6";
import { MdFormatItalic } from "react-icons/md";

interface TextModalProps {
    onClose: () => void;
    onSubmit: (text: string) => void;
    initialColor: string;
}

const availableColors = [
    '#FF4500', '#FF69B4', '#3CB371', 
    '#FFD700', '#DAA520',           
    '#191970',                     
     '#000000',         
];

const TextModal: React.FC<TextModalProps> = ({ onClose, onSubmit, initialColor }) => {
    const [text, setText] = useState('');
    const [openFonts, setOpenFonts] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor);
    const editorRef = useRef(null);
     const applyFormatting = useCallback((command) => {
     if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false);
    }
  }, []);

    const handleSave = () => {
        if (text.trim()) {
            onSubmit(text); 
            onClose();
        }
    };
    return (
        <div className="textStoryModalOverlay" onClick={onClose}>
            
            <div 
                className="textStoryModalContent" 
                style={{ backgroundColor: selectedColor }}
                onClick={e => e.stopPropagation()} 
            >

                {openFonts&& (
                <div className="fontsModal">
                    <div className="fontContent">
                        <button><FaBold /></button>
                        <button><MdFormatItalic /></button>
                        <button><TbTypography /></button>
                        <button onClick={() => setOpenFonts(false)}><IoMdClose /></button>
                    </div>
                </div>
            )}
                <button 
                    className="fontChange" 
                     onClick={() => setOpenFonts(true)}
                >
                    <TbLetterASmall />
                </button>
                <button className="closeButton" onClick={onClose}><IoMdClose /></button>
                <textarea
                    placeholder="Share a story!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    />
                <div className="colorPalette">
                    {availableColors.map(color => (
                        <div 
                            key={color}
                            className="colorOption"
                            style={{ backgroundColor: color, border: selectedColor === color ? '3px solid #f0f0f0' : 'none' }}
                            onClick={() => setSelectedColor(color)}
                        ></div>
                    ))}
                </div>
                <button className="saveButton" onClick={handleSave} disabled={!text.trim()}>
                    Post Story
                </button>
            </div>
        </div>
    );
};

export default TextModal;