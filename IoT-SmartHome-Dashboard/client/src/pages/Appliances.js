import { useEffect, useState } from "react";
import axios from "axios";

function Appliances() {
  const [appliances, setAppliances] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [newEnergy, setNewEnergy] = useState("");

  const deviceTypes = [
    "Light",
    "Fan",
    "AC",
    "Camera",
    "TV",
    "Washing Machine",
    "Smart Oven",
    "Door Lock",
    "Air Purifier",
    "Smart Speaker",
  ];

  useEffect(() => {
    const savedAppliances = JSON.parse(localStorage.getItem("appliances"));

    if (savedAppliances) {
      setAppliances(savedAppliances);
    } else {
      axios
        .get("http://localhost:5000/api/appliances")
        .then((res) => {
          const devicesWithFavorite = res.data.map((item) => ({
            ...item,
            favorite: false,
          }));

          setAppliances(devicesWithFavorite);
          localStorage.setItem(
            "appliances",
            JSON.stringify(devicesWithFavorite)
          );
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const saveDevices = (devices) => {
    setAppliances(devices);
    localStorage.setItem("appliances", JSON.stringify(devices));
  };

  const toggleDevice = (id) => {
    const updatedDevices = appliances.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );

    saveDevices(updatedDevices);
  };

  const toggleFavorite = (id) => {
    const updatedDevices = appliances.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );

    saveDevices(updatedDevices);
  };

  const addDevice = () => {
    if (!newName || !newType || !newEnergy) {
      alert("Please fill all fields");
      return;
    }

    const newDevice = {
      id: Date.now(),
      name: newName,
      type: newType,
      status: false,
      energy: Number(newEnergy),
      favorite: false,
    };

    saveDevices([...appliances, newDevice]);

    setNewName("");
    setNewType("");
    setNewEnergy("");
  };

  const deleteDevice = (id) => {
    const updatedDevices = appliances.filter((item) => item.id !== id);
    saveDevices(updatedDevices);
  };

  const getIcon = (type) => {
    if (type === "Light") return "💡";
    if (type === "Fan") return "🌀";
    if (type === "AC") return "❄️";
    if (type === "Camera") return "📷";
    if (type === "TV") return "📺";
    if (type === "Washing Machine") return "🧺";
    if (type === "Smart Oven") return "🍳";
    if (type === "Door Lock") return "🚪";
    if (type === "Air Purifier") return "🌬";
    if (type === "Smart Speaker") return "🔊";
    return "🔌";
  };

  const filterButtons = ["All", ...deviceTypes];

  const filteredAppliances = appliances
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType = filterType === "All" || item.type === filterType;

      return matchesSearch && matchesType;
    })
    .sort((a, b) => Number(b.favorite) - Number(a.favorite));

  return (
    <div>
      <h1>🔌 Smart Appliances</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          marginBottom: "25px",
          width: "420px",
        }}
      >
        <h2>➕ Add New Device</h2>

        <input
          type="text"
          placeholder="Device Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <br />
        <br />

        <select value={newType} onChange={(e) => setNewType(e.target.value)}>
          <option value="">Select Device Type</option>

          {deviceTypes.map((type) => (
            <option key={type} value={type}>
              {getIcon(type)} {type}
            </option>
          ))}
        </select>

        <br />
        <br />

        <input
          type="number"
          placeholder="Energy Usage"
          value={newEnergy}
          onChange={(e) => setNewEnergy(e.target.value)}
        />

        <br />
        <br />

        <button onClick={addDevice}>Add Device</button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search appliance..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid gray",
        }}
      />

      <div style={{ marginBottom: "20px" }}>
        {filterButtons.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              marginRight: "10px",
              marginBottom: "10px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid gray",
              cursor: "pointer",
              backgroundColor: filterType === type ? "#0ea5e9" : "#ffffff",
              color: filterType === type ? "white" : "#111827",
            }}
          >
            {type === "All" ? "All" : `${getIcon(type)} ${type}`}
          </button>
        ))}
      </div>

      {filteredAppliances.map((item) => (
        <div
          key={item.id}
          style={{
            border: item.favorite ? "2px solid #facc15" : "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            backgroundColor: item.status ? "#e8f5e9" : "#f9fafb",
            color: "#111827",
          }}
        >
          <h2>
            {item.favorite ? "⭐ " : ""}
            {getIcon(item.type)} {item.name}
          </h2>

          <p>Type: {item.type}</p>

          <p>
            Status:
            <strong style={{ color: item.status ? "green" : "red" }}>
              {" "}
              {item.status ? "ON" : "OFF"}
            </strong>
          </p>

          <p>Energy: {item.energy} kWh</p>

          <button onClick={() => toggleDevice(item.id)}>
            {item.status ? "Turn OFF" : "Turn ON"}
          </button>

          <button
            onClick={() => toggleFavorite(item.id)}
            style={{ marginLeft: "10px" }}
          >
            {item.favorite ? "Remove ⭐" : "Add ⭐"}
          </button>

          <button
            onClick={() => deleteDevice(item.id)}
            style={{ marginLeft: "10px" }}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Appliances;