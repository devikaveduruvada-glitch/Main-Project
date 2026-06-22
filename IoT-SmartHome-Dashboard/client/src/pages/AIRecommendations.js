import { useEffect, useState } from "react";

function AIRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const appliances =
      JSON.parse(localStorage.getItem("appliances")) || [];

    let smartTips = [];

    if (appliances.length === 0) {
      smartTips.push(
        "🔌 No devices found. Add appliances to get AI recommendations."
      );
    } else {
      const highestDevice = appliances.reduce((max, item) =>
        item.energy > max.energy ? item : max
      );

      smartTips.push(
        `⚡ ${highestDevice.name} consumes the highest energy (${highestDevice.energy} kWh).`
      );

      const activeDevices = appliances.filter(
        (item) => item.status
      );

      if (activeDevices.length > 0) {
        smartTips.push(
          `🟢 ${activeDevices.length} devices are currently active. Consider turning off unused devices.`
        );
      }

      const lightDevices = appliances.filter(
        (item) => item.type === "Light"
      );

      if (lightDevices.length > 0) {
        smartTips.push(
          "💡 Switch off lights when rooms are empty to save power."
        );
      }

      const acDevices = appliances.filter(
        (item) => item.type === "AC"
      );

      if (acDevices.length > 0) {
        smartTips.push(
          "❄️ Use AC between 24°C and 26°C for better efficiency."
        );
      }

      const totalEnergy = appliances.reduce(
        (sum, item) => sum + Number(item.energy),
        0
      );

      const estimatedSavings = Math.round(totalEnergy * 0.15 * 8);

      smartTips.push(
        `💰 Potential monthly savings: ₹${estimatedSavings}`
      );
    }

    setRecommendations(smartTips);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h1>🤖 AI Energy Recommendations</h1>

      {recommendations.map((item, index) => (
        <div
          key={index}
          style={{
            padding: "15px",
            marginBottom: "12px",
            borderRadius: "10px",
            backgroundColor: "#ecfeff",
            border: "1px solid #a5f3fc",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default AIRecommendations;