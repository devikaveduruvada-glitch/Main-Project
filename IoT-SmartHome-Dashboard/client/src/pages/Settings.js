import { useEffect, useState } from "react";

function Settings({ themeColor, setThemeColor }) {
  const [color, setColor] = useState("#0ea5e9");

  useEffect(() => {
    const savedColor =
      localStorage.getItem("themeColor") || "#0ea5e9";

    setColor(savedColor);
  }, []);

  const saveColor = (selectedColor) => {
    setColor(selectedColor);

    localStorage.setItem(
      "themeColor",
      selectedColor
    );

    if (setThemeColor) {
      setThemeColor(selectedColor);
    }

    alert("🎨 Theme Updated Successfully");
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        width: "650px",
      }}
    >
      <h1>⚙️ Settings</h1>

      <h2>🎨 Theme Color Picker</h2>

      <input
        type="color"
        value={color}
        onChange={(e) => saveColor(e.target.value)}
        style={{
          width: "80px",
          height: "50px",
          border: "none",
          cursor: "pointer",
        }}
      />

      <p>
        Selected Color:
        <strong> {color}</strong>
      </p>

      <h3>Quick Colors</h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => saveColor("#0ea5e9")}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#0ea5e9",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />

        <button
          onClick={() => saveColor("#22c55e")}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#22c55e",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />

        <button
          onClick={() => saveColor("#8b5cf6")}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#8b5cf6",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />

        <button
          onClick={() => saveColor("#f97316")}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#f97316",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />

        <button
          onClick={() => saveColor("#ef4444")}
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#ef4444",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      </div>

      <hr />

      <h2>🔔 Preferences</h2>

      <p>
        <input type="checkbox" defaultChecked />
        {" "}Enable Notifications
      </p>

      <p>
        <input type="checkbox" defaultChecked />
        {" "}Auto Device Scheduling
      </p>

      <p>
        <input type="checkbox" />
        {" "}Email Energy Reports
      </p>

      <p>
        <input type="checkbox" defaultChecked />
        {" "}Energy Saving Mode
      </p>
    </div>
  );
}

export default Settings;