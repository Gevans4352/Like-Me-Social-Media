import "./RecorderModal.scss";
// RecorderModal.tsx
import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./RecorderModal.scss";

interface RecorderModalProps {
    // isRecording: boolean; // you can use this later when hooking actual recording
    onSubmit: (audio: Blob) => void;
    onClose?: () => void; 
}

const RecorderModal: React.FC<RecorderModalProps> = ({  onSubmit, onClose }) => {
    const [isrecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<BlobPart[]>([]);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
        const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            audioChunks.current = [];

            mediaRecorder.ondataavailable = (e) => audioChunks.current.push(e.data);

            mediaRecorder.start();
            setIsRecording(true);

            // === WAVEFORM ANALYSIS ===
            const audioCtx = new AudioContext();
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;

            analyserRef.current = analyser;
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

            source.connect(analyser);

            animateWaveform(); // start updating waveform bars

        } catch (err) {
            console.error("Mic error:", err);
        }
    };

    // 🎛 Real-time waveform animation
  const animateWaveform = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const bars = document.querySelectorAll(".waveform span");

    bars.forEach((bar, i) => {
        const value = dataArrayRef.current[i * 2] || 0; 
        (bar as HTMLElement).style.height = `${Math.max(5, value / 5)}px`;
    });

    if (isrecording) requestAnimationFrame(animateWaveform);
};


    // 🛑 STOP recording + return audio blob
    const stopRecording = () => {
        setIsRecording(false);

        const recorder = mediaRecorderRef.current;
        if (!recorder) return;

        recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
            onSubmit(audioBlob);
        };

        recorder.stop();
    };
    return (
        <div className="recorderModalOverlay">
            <div className="recorderModalContent">
                <button className="closeBtn" onClick={onClose}><IoMdClose /></button>
                <div className="recorderUI">
                    <div className="pulseDot" onClick={startRecording}></div>
                    <div className="waveform">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                   <p>{isrecording ? "Recording..." : "Tap the red dot to start"}</p>
             </div>
                <button className="submitBtn" onClick={() => onSubmit(new Blob())}>
                    Done 
                </button>
            </div>
        </div>
    );
};

export default RecorderModal;
