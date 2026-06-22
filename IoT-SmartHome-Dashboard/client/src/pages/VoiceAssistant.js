import { useState } from "react";

function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("");
  const [result, setResult] = useState("");

  const speak = (message) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const updateDeviceStatus = (appliances, type, status) => {
    return appliances.map((item) =>
      item.type === type ? { ...item, status } : item
    );
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);
    setResult("Listening...");

    recognition.start();

    recognition.onresult = (event) => {
      const spokenCommand =
        event.results[0][0].transcript.toLowerCase();

      setCommand(spokenCommand);
      executeCommand(spokenCommand);
      setListening(false);
    };

    recognition.onerror = () => {
      const errorMessage =
        "Could not recognize your voice. Please try again.";

      setResult(errorMessage);
      speak(errorMessage);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const executeCommand = (spokenCommand) => {
    const appliances =
      JSON.parse(localStorage.getItem("appliances")) || [];

    let updatedAppliances = [...appliances];
    let message =
      "Command not recognized. Try saying: Turn on light, Turn off AC, or Lock door.";

    if (spokenCommand.includes("turn on light")) {
      updatedAppliances = updateDeviceStatus(appliances, "Light", true);
      message = "Light turned on successfully.";
    } else if (spokenCommand.includes("turn off light")) {
      updatedAppliances = updateDeviceStatus(appliances, "Light", false);
      message = "Light turned off successfully.";
    } else if (spokenCommand.includes("turn on fan")) {
      updatedAppliances = updateDeviceStatus(appliances, "Fan", true);
      message = "Fan turned on successfully.";
    } else if (spokenCommand.includes("turn off fan")) {
      updatedAppliances = updateDeviceStatus(appliances, "Fan", false);
      message = "Fan turned off successfully.";
    } else if (
      spokenCommand.includes("turn on ac") ||
      spokenCommand.includes("turn on a c")
    ) {
      updatedAppliances = updateDeviceStatus(appliances, "AC", true);
      message = "AC turned on successfully.";
    } else if (
      spokenCommand.includes("turn off ac") ||
      spokenCommand.includes("turn off a c")
    ) {
      updatedAppliances = updateDeviceStatus(appliances, "AC", false);
      message = "AC turned off successfully.";
    } else if (spokenCommand.includes("turn on camera")) {
      updatedAppliances = updateDeviceStatus(appliances, "Camera", true);
      message = "Camera turned on successfully.";
    } else if (spokenCommand.includes("turn off camera")) {
      updatedAppliances = updateDeviceStatus(appliances, "Camera", false);
      message = "Camera turned off successfully.";
    } else if (spokenCommand.includes("turn on tv")) {
      updatedAppliances = updateDeviceStatus(appliances, "TV", true);
      message = "TV turned on successfully.";
    } else if (spokenCommand.includes("turn off tv")) {
      updatedAppliances = updateDeviceStatus(appliances, "TV", false);
      message = "TV turned off successfully.";
    } else if (
      spokenCommand.includes("turn on washing machine") ||
      spokenCommand.includes("start washing machine")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Washing Machine",
        true
      );
      message = "Washing machine started successfully.";
    } else if (
      spokenCommand.includes("turn off washing machine") ||
      spokenCommand.includes("stop washing machine")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Washing Machine",
        false
      );
      message = "Washing machine stopped successfully.";
    } else if (
      spokenCommand.includes("turn on oven") ||
      spokenCommand.includes("turn on smart oven")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Smart Oven",
        true
      );
      message = "Smart oven turned on successfully.";
    } else if (
      spokenCommand.includes("turn off oven") ||
      spokenCommand.includes("turn off smart oven")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Smart Oven",
        false
      );
      message = "Smart oven turned off successfully.";
    } else if (
      spokenCommand.includes("lock door") ||
      spokenCommand.includes("lock the door")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Door Lock",
        true
      );
      message = "Door locked successfully.";
    } else if (
      spokenCommand.includes("unlock door") ||
      spokenCommand.includes("unlock the door")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Door Lock",
        false
      );
      message = "Door unlocked successfully.";
    } else if (spokenCommand.includes("turn on air purifier")) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Air Purifier",
        true
      );
      message = "Air purifier turned on successfully.";
    } else if (spokenCommand.includes("turn off air purifier")) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Air Purifier",
        false
      );
      message = "Air purifier turned off successfully.";
    } else if (
      spokenCommand.includes("turn on speaker") ||
      spokenCommand.includes("turn on smart speaker")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Smart Speaker",
        true
      );
      message = "Smart speaker turned on successfully.";
    } else if (
      spokenCommand.includes("turn off speaker") ||
      spokenCommand.includes("turn off smart speaker")
    ) {
      updatedAppliances = updateDeviceStatus(
        appliances,
        "Smart Speaker",
        false
      );
      message = "Smart speaker turned off successfully.";
    } else if (spokenCommand.includes("show energy")) {
      message = "Please open the Energy page to view energy reports.";
    } else if (spokenCommand.includes("show analytics")) {
      message =
        "Please open the Analytics page to view detailed analytics.";
    }

    localStorage.setItem(
      "appliances",
      JSON.stringify(updatedAppliances)
    );

    setResult(message);
    speak(message);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        width: "650px",
      }}
    >
      <h1>🎙 Voice Assistant Control</h1>

      <p>
        Use voice commands to control your smart home appliances. The
        assistant will also respond with voice.
      </p>

      <button
        onClick={startListening}
        style={{
          backgroundColor: listening ? "#ef4444" : "#0ea5e9",
          color: "white",
          border: "none",
          padding: "12px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {listening ? "🎧 Listening..." : "🎤 Start Listening"}
      </button>

      <button
        onClick={() => window.speechSynthesis.cancel()}
        style={{
          marginLeft: "10px",
          backgroundColor: "#64748b",
          color: "white",
          border: "none",
          padding: "12px 18px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🔇 Stop Voice
      </button>

      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3>🗣 You Said:</h3>
        <p>{command || "No command yet"}</p>
      </div>

      <div
        style={{
          backgroundColor: "#ecfeff",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #a5f3fc",
        }}
      >
        <h3>✅ Result:</h3>
        <p>{result || "Click Start Listening and say a command."}</p>
      </div>

      <h3 style={{ marginTop: "25px" }}>Example Commands</h3>

      <ul>
        <li>Turn on light</li>
        <li>Turn off light</li>
        <li>Turn on fan</li>
        <li>Turn off fan</li>
        <li>Turn on AC</li>
        <li>Turn off AC</li>
        <li>Turn on camera</li>
        <li>Turn off camera</li>
        <li>Turn on TV</li>
        <li>Turn off TV</li>
        <li>Start washing machine</li>
        <li>Stop washing machine</li>
        <li>Turn on oven</li>
        <li>Turn off oven</li>
        <li>Lock door</li>
        <li>Unlock door</li>
        <li>Turn on air purifier</li>
        <li>Turn off air purifier</li>
        <li>Turn on smart speaker</li>
        <li>Turn off smart speaker</li>
        <li>Show energy</li>
        <li>Show analytics</li>
      </ul>
    </div>
  );
}

export default VoiceAssistant;