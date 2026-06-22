import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(new Date());
  const [unreadCount, setUnreadCount] = useState(0);
  const [aiSummary, setAiSummary] = useState({
    topConsumer: "No device",
    savings: 0,
  });

  const cardStyle = {
    backgroundColor: "#ffffff",
    color: "#111827",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
    padding: "18px",
    borderRadius: "15px",
    textAlign: "center",
    minHeight: "120px",
  };

  const sectionStyle = {
    backgroundColor: "#ffffff",
    color: "#111827",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
  };

  const updateDashboardStats = () => {
    const savedAppliances =
      JSON.parse(localStorage.getItem("appliances")) || [];

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const totalDevices = savedAppliances.length;

    const activeDevices = savedAppliances.filter(
      (device) => device.status
    ).length;

    const totalEnergy = savedAppliances.reduce(
      (sum, device) => sum + Number(device.energy),
      0
    );

    const unread = notifications.filter((item) => !item.read).length;

    const topDevice =
      savedAppliances.length > 0
        ? savedAppliances.reduce((max, item) =>
            Number(item.energy) > Number(max.energy) ? item : max
          )
        : null;

    setStats({
      totalDevices,
      activeDevices,
      totalEnergy,
      alerts: 2,
    });

    setUnreadCount(unread);

    setAiSummary({
      topConsumer: topDevice ? topDevice.name : "No device",
      savings: Math.round(totalEnergy * 0.15 * 8),
    });
  };

  const pieData = stats
    ? [
        { name: "Active", value: stats.activeDevices },
        {
          name: "Inactive",
          value: stats.totalDevices - stats.activeDevices,
        },
      ]
    : [];

  const COLORS = ["#22c55e", "#ef4444"];

  useEffect(() => {
    updateDashboardStats();

    const timer = setInterval(() => {
      setTime(new Date());
      updateDashboardStats();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/weather")
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/history")
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <h2 style={{ color: "#0ea5e9", marginBottom: "8px", fontSize: "30px", fontFamily: "Trebuchet MS" }}>
            Welcome Home 👋
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", margin: 0 }}>
            Monitor devices, energy usage, schedules, and alerts in real time.
          </p>
        </div>

        <div style={{ backgroundColor: "#f3f4f6", color: "#111827", boxShadow: "0px 4px 10px rgba(0,0,0,0.12)", padding: "12px 18px", borderRadius: "15px", minWidth: "210px", textAlign: "center" }}>
          <strong>🕒 Current Time</strong>
          <p style={{ fontSize: "20px", fontWeight: "bold", margin: "8px 0 0" }}>
            {time.toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "18px", marginBottom: "25px" }}>
        <div style={cardStyle}>
          <h3>📱 Devices</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{stats?.totalDevices || 0}</p>
        </div>

        <div style={cardStyle}>
          <h3>🟢 Active</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{stats?.activeDevices || 0}</p>
        </div>

        <div style={cardStyle}>
          <h3>⚡ Energy</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{stats?.totalEnergy || 0} kWh</p>
        </div>

        <div style={cardStyle}>
          <h3>🚨 Alerts</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{stats?.alerts || 0}</p>
        </div>

        <div style={cardStyle}>
          <h3>🔔 Unread</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{unreadCount}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "25px" }}>
        <div style={sectionStyle}>
          <h2>🤖 AI Summary</h2>
          <p><strong>Top Consumer:</strong> {aiSummary.topConsumer}</p>
          <p><strong>Potential Savings:</strong> ₹{aiSummary.savings}</p>
          <p><strong>Suggestion:</strong> Reduce high-energy device usage.</p>
        </div>

        <div style={{ ...sectionStyle, backgroundColor: "#ecfdf5" }}>
          <h2>🟢 System Health</h2>
          <p><strong>Network:</strong> Online</p>
          <p><strong>Server:</strong> Running</p>
          <p>
            <strong>Connected Devices:</strong>{" "}
            {stats?.activeDevices || 0}/{stats?.totalDevices || 0}
          </p>
          <p><strong>Health Score:</strong> 98%</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "25px" }}>
        <div style={sectionStyle}>
          <h2>📊 Device Status Overview</h2>
          <PieChart width={360} height={260}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {weather && (
          <div style={{ ...sectionStyle, backgroundColor: "#e0f7fa" }}>
            <h2>🌡️ Weather Status</h2>
            <p><strong>Temperature:</strong> {weather.temperature}°C</p>
            <p><strong>Humidity:</strong> {weather.humidity}%</p>
            <p><strong>Status:</strong> {weather.condition}</p>
            <p><strong>Recommendation:</strong> {weather.recommendation}</p>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "25px" }}>
        <div style={{ ...sectionStyle, backgroundColor: "#fef9c3" }}>
          <h2>📈 Energy Trend</h2>
          <p><strong>This Week:</strong> +12%</p>
          <p><strong>Compared to Last Week:</strong> Higher usage detected</p>
          <p><strong>Tip:</strong> Turn off unused appliances.</p>
        </div>

        <div style={sectionStyle}>
          <h2>📜 Device Usage History</h2>
          {history.length === 0 ? (
            <p>No device history available.</p>
          ) : (
            history.map((item, index) => <p key={index}>🔹 {item}</p>)
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;