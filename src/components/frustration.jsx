import { useState, useRef } from "react";
import "./frustration.css";
const wii = "/sounds/wii.mp3";

const VolumeTrap = () => {
    const [volume, setVolume] = useState(50);
    const [fallen, setFallen] = useState(false);
    const [playOnce, setPlayOnce] = useState(false);
    const [buttonEscaping, setButtonEscaping] = useState(false);
    const audioRef = useRef(null);
    const buttonRef = useRef(null);

    const handleVolumeChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setVolume(value);
        if (audioRef.current) {
            audioRef.current.volume = value / 100;
        }
        if (value === 100) {
            setFallen(true);
        }
    };

    const handlePlay = () => {
        if (!playOnce && audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setPlayOnce(true);
                }).catch(error => console.error("Audio playback error:", error));
            } else {
                setPlayOnce(true);
            }
        }
    };

    const escapeButton = () => {
        if (playOnce) {
            setButtonEscaping(true);
            const button = buttonRef.current;
            if (button) {
                button.style.position = "absolute";
                button.style.top = `${Math.random() * 80 + 10}%`;
                button.style.left = `${Math.random() * 80 + 10}%`;
            }
        }
    };

    return (
        <div className="container">
            <h1 className="shaky">La frustration</h1>
            <p className="shaky">Augmentez le volume au max et appuyez sur play pour entendre le magnifique son.</p>
            <audio ref={audioRef} src={wii} autoPlay loop onLoadedData={() => {
                if (audioRef.current) {
                    audioRef.current.volume = volume / 100;
                }
            }} />
            <button 
                ref={buttonRef} 
                className={`play-button ${buttonEscaping ? 'escaping' : ''}`} 
                onClick={handlePlay} 
                onMouseEnter={escapeButton}
            >
                Play
            </button>
            <div className={`slider-container ${fallen ? 'fallen' : ''}`}>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    disabled={fallen}
                    className="slider"
                />
            </div>
        </div>
    );
};

export default VolumeTrap;