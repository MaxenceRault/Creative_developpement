import React, { useState } from "react";
import Intro from "./components/intro";
import Calme from './components/calme';
import Mystere from "./components/mystere";
import Frustration from "./components/frustration";
import Navigation from "./components/navigation";

const App = () => {
    const [currentComponent, setCurrentComponent] = useState('Intro');

    const renderComponent = () => {
        switch (currentComponent) {
            case 'Intro':
                return <Intro />;
            case 'Calme':
                return <Calme />;
            case 'Mystere':
                return <Mystere />;
            case 'Frustration':
                return <Frustration />;
            default:
                return <Intro />;
        }
    };

    return (
        <div>
            {renderComponent()}
            <Navigation currentComponent={currentComponent} setCurrentComponent={setCurrentComponent} />
        </div>
    );
};

export default App;