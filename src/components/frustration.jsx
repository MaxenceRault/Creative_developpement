import { useState, useRef } from "react";
import "./frustration.css";
const wii = "/sounds/wii.mp3";

const VolumeTrap = () => {
    const [volume, setVolume] = useState(50);
    const [fallen, setFallen] = useState(false);
    const [playOnce, setPlayOnce] = useState(false);
    const [buttonEscaping, setButtonEscaping] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWobbling, setIsWobbling] = useState(false);
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

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                        setPlayOnce(true);
                        setIsWobbling(true); // Commence l'animation de tremblement
                    }).catch(error => console.error("Audio playback error:", error));
                } else {
                    setIsPlaying(true);
                    setPlayOnce(true);
                    setIsWobbling(true); // Commence l'animation de tremblement
                }
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
        <div className="frustration-container">
            <h1 className={`frustration-h1 ${isWobbling ? 'wobble' : ''}`}>La frustration</h1>
            <p className={`frustration-p ${isWobbling ? 'wobble' : ''}`}>
                Augmentez le volume au max et appuyez sur play pour entendre le magnifique son.
            </p>
            <audio
                ref={audioRef}
                src={wii}
                loop
                onLoadedData={() => {
                    if (audioRef.current) {
                        audioRef.current.volume = volume / 100;
                    }
                }}
            />
            <button
                ref={buttonRef}
                className={`play-btn ${buttonEscaping ? 'button-moving' : ''}`}
                onClick={handlePlayPause}
                onMouseEnter={escapeButton}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className={`volume-slider-container ${fallen ? 'slider-triggered' : ''}`}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    disabled={fallen}
                    className="volume-slider"
                />
            </div>
        </div>
    );
};

export default VolumeTrap;