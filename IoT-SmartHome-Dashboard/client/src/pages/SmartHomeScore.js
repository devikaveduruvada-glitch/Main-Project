function SmartHomeScore() {
  const appliances =
    JSON.parse(localStorage.getItem("appliances")) || [];

  const totalDevices = appliances.length;

  const activeDevices = appliances.filter(
    (item) => item.status
  ).length;

  const totalEnergy = appliances.reduce(
    (sum, item) => sum + Number(item.energy),
    0
  );

  const energyScore =
    totalEnergy < 100 ? 95 : totalEnergy < 200 ? 80 : 65;

  const deviceScore =
    totalDevices > 0
      ? Math.round((activeDevices / totalDevices) * 100)
      : 0;

  const securityScore = 95;

  const overallScore = Math.round(
    (energyScore + deviceScore + securityScore) / 3
  );

  return (
    <div>
      <h1>🏆 Smart Home Score</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          width: "500px",
        }}
      >
        <h2>Overall Score: {overallScore}%</h2>

        <p>⚡ Energy Efficiency: {energyScore}%</p>
        <p>📱 Device Activity: {deviceScore}%</p>
        <p>🔒 Security Score: {securityScore}%</p>

        <hr />

        <h3>
          {overallScore >= 90
            ? "🌟 Excellent Smart Home"
            : overallScore >= 75
            ? "✅ Good Smart Home"
            : "⚠ Needs Improvement"}
        </h3>
      </div>
    </div>
  );
}

export default SmartHomeScore;