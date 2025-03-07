import FoggyBackground from "../assets/background/FoggyBackground";

export default function Calme() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <FoggyBackground />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#ffffff",
        textAlign: "center",
        fontSize: "2rem",
        fontFamily: "Arial, sans-serif",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
      }}>
        <h1>Un moment de sérénité</h1>
        <p>Respire profondément et profite du calme.</p>
      </div>
    </div>
  );
}