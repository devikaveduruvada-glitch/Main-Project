import { useEffect, useState } from "react";
import axios from "axios";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/alerts")
      .then((res) => setAlerts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>🚨 Alerts</h1>

      {alerts.map((alert, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#ffe5e5",
            color: "#111827",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            border: "1px solid #ff9b9b",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.12)",
            fontWeight: "500",
          }}
        >
          ⚠ {alert}
        </div>
      ))}
    </div>
  );
}

export default Alerts;