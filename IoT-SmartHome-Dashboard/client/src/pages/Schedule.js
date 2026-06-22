import { useEffect, useState } from "react";
import axios from "axios";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [device, setDevice] = useState("");
  const [action, setAction] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const savedSchedules = JSON.parse(localStorage.getItem("schedules"));

    if (savedSchedules) {
      setSchedules(savedSchedules);
    } else {
      axios
        .get("http://localhost:5000/api/schedules")
        .then((res) => {
          setSchedules(res.data);
          localStorage.setItem("schedules", JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const saveSchedules = (updatedSchedules) => {
    setSchedules(updatedSchedules);
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  const addSchedule = () => {
    if (!device || !action || !time) {
      alert("Please fill all fields");
      return;
    }

    const newSchedule = {
      id: Date.now(),
      device,
      action,
      time,
    };

    saveSchedules([...schedules, newSchedule]);

    setDevice("");
    setAction("");
    setTime("");
  };

  const deleteSchedule = (id) => {
    const updatedSchedules = schedules.filter((item) => item.id !== id);
    saveSchedules(updatedSchedules);
  };

  return (
    <div>
      <h1>📅 Smart Schedule Management</h1>

      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111827",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          width: "420px",
        }}
      >
        <h2>➕ Add Schedule</h2>

        <input
          type="text"
          placeholder="Device Name"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
        />

        <br />
        <br />

        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="">Select Action</option>
          <option value="Turn ON">Turn ON</option>
          <option value="Turn OFF">Turn OFF</option>
        </select>

        <br />
        <br />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <br />
        <br />

        <button onClick={addSchedule}>Add Schedule</button>
      </div>

      <h2>📌 Scheduled Tasks</h2>

      {schedules.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "#ffffff",
            color: "#111827",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.12)",
            width: "400px",
          }}
        >
          <h3>{item.device}</h3>
          <p>Action: {item.action}</p>
          <p>Time: {item.time}</p>

          <button onClick={() => deleteSchedule(item.id)}>
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Schedule;