import { useState, useEffect } from "react";

function Notifications() {
  const defaultNotifications = [
    {
      id: 1,
      text: "⚡ High energy usage detected",
      read: false,
    },
    {
      id: 2,
      text: "📷 Security Camera connected",
      read: false,
    },
    {
      id: 3,
      text: "❄️ AC scheduled for 06:00 PM",
      read: false,
    },
    {
      id: 4,
      text: "💡 Living Room Light turned ON",
      read: false,
    },
    {
      id: 5,
      text: "📊 Weekly energy report generated",
      read: false,
    },
  ];

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("notifications")
    );

    if (saved) {
      setNotifications(saved);
    } else {
      setNotifications(defaultNotifications);
      localStorage.setItem(
        "notifications",
        JSON.stringify(defaultNotifications)
      );
    }
  }, []);

  const saveNotifications = (updated) => {
    setNotifications(updated);
    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );
  };

  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id
        ? { ...item, read: true }
        : item
    );

    saveNotifications(updated);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(
      (item) => item.id !== id
    );

    saveNotifications(updated);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <h1>🔔 Notifications Center</h1>

      <h3>
        Unread Notifications:{" "}
        {
          notifications.filter(
            (item) => !item.read
          ).length
        }
      </h3>

      {notifications.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "15px",
            marginBottom: "12px",
            borderRadius: "10px",
            backgroundColor: item.read
              ? "#f1f5f9"
              : "#dbeafe",
            border: "1px solid #cbd5e1",
          }}
        >
          <p>
            {item.text}
            {item.read && " ✅"}
          </p>

          <button
            onClick={() =>
              markAsRead(item.id)
            }
            style={{
              marginRight: "10px",
            }}
          >
            Mark Read
          </button>

          <button
            onClick={() =>
              deleteNotification(item.id)
            }
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notifications;