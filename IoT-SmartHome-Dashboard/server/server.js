const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let appliances = [
  { id: 1, name: "Living Room Light", type: "Light", status: false, energy: 12 },
  { id: 2, name: "Ceiling Fan", type: "Fan", status: true, energy: 20 },
  { id: 3, name: "Air Conditioner", type: "AC", status: false, energy: 45 },
  { id: 4, name: "Security Camera", type: "Camera", status: true, energy: 8 },
];

app.get("/", (req, res) => {
  res.send("IoT Smart Home Backend Running");
});

app.get("/api/appliances", (req, res) => {
  res.json(appliances);
});

app.put("/api/appliances/:id/toggle", (req, res) => {
  const id = Number(req.params.id);

  appliances = appliances.map((item) =>
    item.id === id ? { ...item, status: !item.status } : item
  );

  const updatedAppliance = appliances.find((item) => item.id === id);

  res.json(updatedAppliance);
});

app.get("/api/energy", (req, res) => {
  res.json([
    { day: "Mon", energy: 20 },
    { day: "Tue", energy: 35 },
    { day: "Wed", energy: 28 },
    { day: "Thu", energy: 40 },
    { day: "Fri", energy: 30 },
    { day: "Sat", energy: 45 },
    { day: "Sun", energy: 25 },
  ]);
});

app.get("/api/alerts", (req, res) => {
  res.json([
    "High Energy Usage Detected",
    "Living Room Light Left ON",
    "Camera Connection Lost",
  ]);
});

let schedules = [
  {
    id: 1,
    device: "Air Conditioner",
    action: "Turn ON",
    time: "06:00 PM",
  },
  {
    id: 2,
    device: "Living Room Light",
    action: "Turn OFF",
    time: "11:00 PM",
  },
];

app.get("/api/schedules", (req, res) => {
  res.json(schedules);
});

app.get("/api/weather", (req, res) => {
  res.json({
    location: "Andhra Pradesh",
    temperature: 34,
    humidity: 68,
    condition: "Sunny",
    recommendation:
      "High temperature detected. You can turn ON the AC.",
  });
}); 

app.get("/api/dashboard", (req, res) => {
  res.json({
    totalDevices: appliances.length,
    activeDevices: appliances.filter(
      (device) => device.status
    ).length,
    totalEnergy: appliances.reduce(
      (sum, device) => sum + device.energy,
      0
    ),
    alerts: 2,
  });
});

app.get("/api/history", (req, res) => {
  res.json([
    "Living Room Light turned ON at 06:30 PM",
    "Ceiling Fan turned OFF at 07:00 PM",
    "Air Conditioner turned ON at 08:15 PM",
    "Security Camera checked at 09:00 PM",
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});