import { useEffect, useState } from "react";

function Devices() {
  const [devices, setDevices] = useState([]);
  const [temperature, setTemperature] = useState("--");
  const [locationName, setLocationName] = useState("Loading...");

  useEffect(() => {
    const savedDevices =
      JSON.parse(localStorage.getItem("appliances")) || [
        { id: 1, name: "Living Room Lights", type: "Light", status: true },
        { id: 2, name: "Living Room TV", type: "TV", status: false },
        { id: 3, name: "Living Room Camera", type: "Camera", status: false },
        { id: 4, name: "Dryer", type: "Dryer", status: false },
        { id: 5, name: "Washer", type: "Washer", status: false },
        { id: 6, name: "Smart Outlet", type: "Outlet", status: true },
        { id: 7, name: "Air Purifier", type: "Purifier", status: true },
        { id: 8, name: "Air Conditioner", type: "AC", status: false },
      ];

    setDevices(savedDevices);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`
            );

            const data = await response.json();

            setTemperature(
              Math.round(data.current.temperature_2m)
            );

            setLocationName("Current Location");
          } catch (error) {
            console.log(error);
            setLocationName("Weather Unavailable");
          }
        },
        () => {
          setLocationName("Location Permission Denied");
        }
      );
    }
  }, []);

  const getIcon = (type) => {
    if (type === "Light") return "💡";
    if (type === "TV") return "📺";
    if (type === "Camera") return "📷";
    if (type === "Dryer") return "🧺";
    if (type === "Washer") return "🧼";
    if (type === "Outlet") return "🔌";
    if (type === "Purifier") return "🌬";
    if (type === "AC") return "❄";
    if (type === "Fan") return "🌀";
    return "▣";
  };

  const toggleDevice = (id) => {
    const updatedDevices = devices.map((device) =>
      device.id === id
        ? { ...device, status: !device.status }
        : device
    );

    setDevices(updatedDevices);
    localStorage.setItem(
      "appliances",
      JSON.stringify(updatedDevices)
    );
  };

  return (
    <div>
      <h1 style={{ color: "#111827" }}>Devices</h1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "10px 18px",
            borderRadius: "20px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
            fontWeight: "bold",
          }}
        >
          💡 {devices.filter((d) => d.status).length} On
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "10px 18px",
            borderRadius: "20px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
            fontWeight: "bold",
          }}
        >
          🌡 {temperature}°C
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "10px 18px",
            borderRadius: "20px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
            fontWeight: "bold",
          }}
        >
          📍 {locationName}
        </div>
      </div>

      <h3 style={{ color: "#6b7280" }}>Living Room</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "15px",
        }}
      >
        {devices.map((device) => (
          <div
            key={device.id}
            style={{
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "18px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
              minHeight: "120px",
              position: "relative",
            }}
          >
            <button
              onClick={() => toggleDevice(device.id)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                backgroundColor: device.status
                  ? "#22c55e"
                  : "#e5e7eb",
                color: device.status
                  ? "white"
                  : "#111827",
                fontWeight: "bold",
              }}
            >
              ⏻
            </button>

            <div
              style={{
                fontSize: "30px",
                marginBottom: "15px",
              }}
            >
              {getIcon(device.type)}
            </div>

            <strong>{device.name}</strong>

            <p
              style={{
                marginTop: "8px",
                color: device.status
                  ? "#22c55e"
                  : "#6b7280",
                fontWeight: "bold",
              }}
            >
              {device.status ? "On" : "Off"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Devices;