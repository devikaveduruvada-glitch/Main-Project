import { useState } from "react";

function AIHomeAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Hello! I am your Smart Home Assistant 🤖"
  );

  const askAI = () => {
    const appliances =
      JSON.parse(localStorage.getItem("appliances")) || [];

    const totalEnergy = appliances.reduce(
      (sum, item) => sum + Number(item.energy),
      0
    );

    const activeDevices = appliances.filter(
      (item) => item.status
    ).length;

    const topDevice =
      appliances.length > 0
        ? appliances.reduce((max, item) =>
            Number(item.energy) > Number(max.energy)
              ? item
              : max
          )
        : null;

    const text = question.toLowerCase();

    if (text.includes("energy")) {
      setAnswer(
        `⚡ Total energy consumption is ${totalEnergy} kWh`
      );
    } else if (
      text.includes("active") ||
      text.includes("devices")
    ) {
      setAnswer(
        `🟢 Currently ${activeDevices} devices are active`
      );
    } else if (
      text.includes("highest") ||
      text.includes("most")
    ) {
      setAnswer(
        `📈 Highest energy device: ${
          topDevice ? topDevice.name : "No devices found"
        }`
      );
    } else if (
      text.includes("hello") ||
      text.includes("hi")
    ) {
      setAnswer(
        "👋 Hello! How can I help with your smart home?"
      );
    } else {
      setAnswer(
        "🤖 Sorry, I don't understand. Try asking about energy, devices, or highest usage."
      );
    }

    setQuestion("");
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        maxWidth: "700px",
      }}
    >
      <h1>🤖 AI Home Assistant</h1>

      <div
        style={{
          backgroundColor: "#f8fafc",
          padding: "15px",
          borderRadius: "10px",
          minHeight: "100px",
          marginBottom: "20px",
        }}
      >
        {answer}
      </div>

      <input
        type="text"
        value={question}
        placeholder="Ask something..."
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "80%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid gray",
        }}
      />

      <button
        onClick={askAI}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Ask
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Try asking:</h3>
        <p>• How much energy am I using?</p>
        <p>• Which device uses the most energy?</p>
        <p>• How many active devices?</p>
      </div>
    </div>
  );
}

export default AIHomeAssistant;