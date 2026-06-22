import { useEffect, useState } from "react";

function Reports() {
  const [devices, setDevices] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedDevices =
      JSON.parse(localStorage.getItem("appliances")) || [];

    const savedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setDevices(savedDevices);
    setNotifications(savedNotifications);
  }, []);

  const totalDevices = devices.length;
  const activeDevices = devices.filter((item) => item.status).length;

  const totalEnergy = devices.reduce(
    (sum, item) => sum + Number(item.energy),
    0
  );

  const estimatedCost = totalEnergy * 8;

  const unreadNotifications = notifications.filter(
    (item) => !item.read
  ).length;

  const exportReport = () => {
    const report = `
IoT Smart Home Report

Total Devices: ${totalDevices}
Active Devices: ${activeDevices}
Total Energy: ${totalEnergy} kWh
Estimated Cost: ₹${estimatedCost}
Unread Notifications: ${unreadNotifications}
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "smart-home-report.txt";
    link.click();
  };

  return (
    <div>
      <h1>📊 Smart Home Reports</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          width: "600px",
        }}
      >
        <h2>📌 Project Summary</h2>

        <p><strong>Total Devices:</strong> {totalDevices}</p>
        <p><strong>Active Devices:</strong> {activeDevices}</p>
        <p><strong>Total Energy:</strong> {totalEnergy} kWh</p>
        <p><strong>Estimated Cost:</strong> ₹{estimatedCost}</p>
        <p><strong>Unread Notifications:</strong> {unreadNotifications}</p>

        <button onClick={exportReport}>
          📥 Export Smart Home Report
        </button>
      </div>
    </div>
  );
}

export default Reports;