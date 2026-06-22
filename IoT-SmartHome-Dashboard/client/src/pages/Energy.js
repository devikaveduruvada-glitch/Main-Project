import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function Energy() {
  const [data, setData] = useState([]);
  const [applianceData, setApplianceData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/energy")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    const savedAppliances =
      JSON.parse(localStorage.getItem("appliances")) || [];

    setApplianceData(savedAppliances);
  }, []);

  const totalEnergy = applianceData.reduce(
    (sum, item) => sum + Number(item.energy),
    0
  );

  const averageEnergy =
    applianceData.length > 0
      ? (totalEnergy / applianceData.length).toFixed(2)
      : 0;

  const highestUsage =
    applianceData.length > 0
      ? applianceData.reduce((max, item) =>
          Number(item.energy) > Number(max.energy) ? item : max
        )
      : null;

  const lowestUsage =
    applianceData.length > 0
      ? applianceData.reduce((min, item) =>
          Number(item.energy) < Number(min.energy) ? item : min
        )
      : null;

  const predictedEnergy = Math.round(totalEnergy * 1.15);
  const expectedIncrease = predictedEnergy - totalEnergy;
  const predictedCost = predictedEnergy * 8;

  const exportCSV = () => {
    const csvData = [
      ["Device Name", "Type", "Energy"],
      ...applianceData.map((item) => [
        item.name,
        item.type,
        item.energy,
      ]),
    ];

    const csvContent = csvData
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "device-energy-report.csv";
    link.click();
  };

  return (
    <div>
      <h1>⚡ Energy Monitoring</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          width: "750px",
        }}
      >
        <h2>📊 Weekly Energy Usage</h2>

        <LineChart width={700} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="energy" />
        </LineChart>
      </div>

      <button
        onClick={exportCSV}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        📥 Export Device Energy Report
      </button>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#111827",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            width: "350px",
          }}
        >
          <h2>💰 Energy Cost Estimate</h2>

          <p>
            <strong>Total Energy:</strong> {totalEnergy} kWh
          </p>

          <p>
            <strong>Rate:</strong> ₹8 per kWh
          </p>

          <h3>Estimated Cost: ₹{totalEnergy * 8}</h3>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#111827",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            width: "380px",
          }}
        >
          <h2>📈 Energy Insights</h2>

          <p>
            <strong>Total Usage:</strong> {totalEnergy} kWh
          </p>

          <p>
            <strong>Average Usage:</strong> {averageEnergy} kWh
          </p>

          <p>
            <strong>Highest Usage Device:</strong>{" "}
            {highestUsage
              ? `${highestUsage.name} - ${highestUsage.energy} kWh`
              : "No devices added"}
          </p>

          <p>
            <strong>Lowest Usage Device:</strong>{" "}
            {lowestUsage
              ? `${lowestUsage.name} - ${lowestUsage.energy} kWh`
              : "No devices added"}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#111827",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            width: "380px",
          }}
        >
          <h2>🔮 Energy Prediction</h2>

          <p>
            <strong>Current Usage:</strong> {totalEnergy} kWh
          </p>

          <p>
            <strong>Next Month Prediction:</strong> {predictedEnergy} kWh
          </p>

          <p>
            <strong>Expected Increase:</strong> {expectedIncrease} kWh
          </p>

          <h3>Predicted Cost: ₹{predictedCost}</h3>
        </div>
      </div>
    </div>
  );
}

export default Energy;