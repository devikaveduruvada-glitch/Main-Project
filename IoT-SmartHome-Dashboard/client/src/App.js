import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Appliances from "./pages/Appliances";
import Energy from "./pages/Energy";
import Schedule from "./pages/Schedule";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import AIRecommendations from "./pages/AIRecommendations";
import AIHomeAssistant from "./pages/AIHomeAssistant";
import Reports from "./pages/Reports";
import SmartHomeScore from "./pages/SmartHomeScore";
import VoiceAssistant from "./pages/VoiceAssistant";
import MobileView from "./pages/MobileView";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState("#0ea5e9");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [showSignup, setShowSignup] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const savedColor =
      localStorage.getItem("themeColor") || "#0ea5e9";

    const savedMode =
      localStorage.getItem("darkMode") === "true";

    setThemeColor(savedColor);
    setDarkMode(savedMode);
  }, []);

  const loginUser = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  if (!isLoggedIn) {
    return showSignup ? (
      <Signup setShowSignup={setShowSignup} />
    ) : (
      <Login
        setIsLoggedIn={loginUser}
        setShowSignup={setShowSignup}
      />
    );
  }

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          backgroundColor: darkMode ? "#111827" : "#f8fafc",
          color: darkMode ? "white" : "black",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Sidebar themeColor={themeColor} />

        <div style={{ flex: 1, padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: `2px solid ${themeColor}`,
              paddingBottom: "10px",
            }}
          >
            <h2
              style={{
                fontFamily: "Trebuchet MS",
                fontSize: "30px",
                fontWeight: "bold",
                color: themeColor,
                letterSpacing: "2px",
                margin: 0,
              }}
            >
              IoT Smart Home & Energy Monitoring Dashboard
            </h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={toggleDarkMode}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button
                onClick={() => setShowLogoutModal(true)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🚪 Logout
              </button>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/energy" element={<Energy />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/recommendations"
              element={<AIRecommendations />}
            />
            <Route
              path="/ai-home-assistant"
              element={<AIHomeAssistant />}
            />
            <Route
              path="/smart-score"
              element={<SmartHomeScore />}
            />
            <Route
              path="/voice-assistant"
              element={<VoiceAssistant />}
            />
            <Route
              path="/mobile-view"
              element={<MobileView />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/settings"
              element={
                <Settings
                  themeColor={themeColor}
                  setThemeColor={setThemeColor}
                />
              }
            />
          </Routes>

          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              paddingTop: "15px",
              borderTop: `2px solid ${themeColor}`,
              color: darkMode ? "#d1d5db" : "gray",
              fontSize: "14px",
            }}
          >
            © 2026 IoT Smart Home Dashboard | Developed by Devika
          </div>
        </div>

        {showLogoutModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.45)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                color: "#111827",
                width: "380px",
                padding: "30px",
                borderRadius: "18px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <h2 style={{ marginTop: 0 }}>🚪 Confirm Logout</h2>

              <p style={{ color: "#475569", fontSize: "16px" }}>
                Are you sure you want to logout from your Smart Home Dashboard?
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <button
                  onClick={() => setShowLogoutModal(false)}
                  style={{
                    backgroundColor: "#e5e7eb",
                    color: "#111827",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={confirmLogout}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;