import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Analytics() {
  const [devices, setDevices] = useState([]);

  const data = [
    { month: "Jan", energy: 120 },
    { month: "Feb", energy: 150 },
    { month: "Mar", energy: 180 },
    { month: "Apr", energy: 140 },
    { month: "May", energy: 200 },
    { month: "Jun", energy: 170 },
  ];

  useEffect(() => {
    const savedDevices =
      JSON.parse(localStorage.getItem("appliances")) || [];

    const sortedDevices = [...savedDevices].sort(
      (a, b) => b.energy - a.energy
    );

    setDevices(sortedDevices);
  }, []);

  return (
    <div>
      <h1>📈 Analytics Dashboard</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          marginBottom: "20px",
        }}
      >
        <h2>📊 Monthly Energy Consumption</h2>

        <BarChart width={700} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="energy" fill="#0ea5e9" />
        </BarChart>
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          marginBottom: "20px",
        }}
      >
        <h2>🏆 Appliance Ranking</h2>

        {devices.length === 0 ? (
          <p>No appliances found.</p>
        ) : (
          devices.map((device, index) => (
            <p key={device.id}>
              {index + 1}. {device.name} — {device.energy} kWh
            </p>
          ))
        )}
      </div>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h2>📋 Summary</h2>

        <p>Highest Usage Month: May</p>
        <p>Lowest Usage Month: January</p>
        <p>Average Monthly Usage: 160 kWh</p>
        <p>Estimated Annual Cost: ₹15,360</p>
      </div>
    </div>
  );
}

export default Analytics;