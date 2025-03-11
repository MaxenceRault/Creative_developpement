import { useState } from "react";
import "./frustration.css";

const VolumeTrap = () => {
    const [volume, setVolume] = useState(50);
    const [fallen, setFallen] = useState(false);

    const handleVolumeChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (isNaN(value)) {
            return;
        }
        setVolume(value);
        if (value === 100) {
            setFallen(true);
        }
    };

    return (
        <div className="container">
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
