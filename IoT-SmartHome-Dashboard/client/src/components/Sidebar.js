import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ themeColor }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: "⌂", label: "Dashboard" },
    { path: "/devices", icon: "▧", label: "Devices" },
    { path: "/appliances", icon: "▦", label: "Appliances" },
    { path: "/energy", icon: "⚡", label: "Energy" },
    { path: "/schedule", icon: "◷", label: "Schedule" },

    { divider: true },

    { path: "/alerts", icon: "⚠", label: "Alerts" },
    { path: "/notifications", icon: "◉", label: "Notifications" },
    { path: "/analytics", icon: "◔", label: "Analytics" },
    { path: "/smart-score", icon: "★", label: "Smart Home Score" },
    { path: "/voice-assistant", icon: "◎", label: "Voice Assistant" },
    { path: "/ai-home-assistant", icon: "◇", label: "AI Home Assistant" },
    { path: "/mobile-view", icon: "▣", label: "Mobile App View" },
    { path: "/reports", icon: "☰", label: "Reports" },
    { path: "/recommendations", icon: "✦", label: "AI Recommendations" },
    { path: "/profile", icon: "◌", label: "Profile" },
    { path: "/settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        width: open ? "260px" : "80px",
        minHeight: "100vh",
        backgroundColor: themeColor || "#f3f4f6",
        borderRight: `2px solid ${themeColor || "#d1d5db"}`,
        transition: "all 0.35s ease",
        overflow: "hidden",
        padding: "15px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#ffffff",
          whiteSpace: "nowrap",
        }}
      >
        {open ? "Smart Home" : "⌂"}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {menuItems.map((item, index) => {
          if (item.divider) {
            return (
              <hr
                key={index}
                style={{
                  border: "none",
                  borderTop: "1px dashed rgba(255,255,255,0.5)",
                  margin: "15px 0",
                }}
              />
            );
          }

          return (
            <li key={item.path} style={{ marginBottom: "8px" }}>
              <Link
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "12px",
                  transition: "0.3s",
                  fontWeight: "500",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              >
                <span
                  style={{
                    fontSize: "17px",
                    minWidth: "24px",
                    textAlign: "center",
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  {item.icon}
                </span>

                {open && (
                  <span style={{ whiteSpace: "nowrap" }}>
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "15px",
            right: "15px",
            backgroundColor: "rgba(255,255,255,0.18)",
            padding: "12px",
            borderRadius: "12px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
            textAlign: "center",
            color: "white",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Devika</div>

          <div
            style={{
              color: "#bbf7d0",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            ● Online
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;