import { useEffect, useState } from "react";

function MobileView() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const savedDevices =
      JSON.parse(localStorage.getItem("appliances")) || [];

    setDevices(savedDevices);
  }, []);

  const activeDevices = devices.filter((item) => item.status).length;

  const totalEnergy = devices.reduce(
    (sum, item) => sum + Number(item.energy),
    0
  );

  return (
    <div>
      <h1>📱 Mobile App Simulation</h1>

      <div
        style={{
          width: "330px",
          minHeight: "620px",
          backgroundColor: "#111827",
          border: "12px solid black",
          borderRadius: "35px",
          padding: "18px",
          color: "white",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            borderBottom: "1px solid #374151",
            paddingBottom: "15px",
            marginBottom: "20px",
          }}
        >
          <h2>🏠 SmartHome</h2>
          <p style={{ color: "#9ca3af" }}>Mobile Control Panel</p>
        </div>

        <div
          style={{
            backgroundColor: "#1f2937",
            padding: "15px",
            borderRadius: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>📊 Home Summary</h3>
          <p>Devices: {devices.length}</p>
          <p>Active: {activeDevices}</p>
          <p>Energy: {totalEnergy} kWh</p>
        </div>

        <h3>🔌 Devices</h3>

        {devices.length === 0 ? (
          <p>No devices added</p>
        ) : (
          devices.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: item.status ? "#064e3b" : "#374151",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "10px",
              }}
            >
              <strong>{item.name}</strong>
              <p style={{ margin: "5px 0" }}>
                {item.type} • {item.status ? "ON" : "OFF"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MobileView;