import { useState } from "react";

function Signup({ setShowSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("User already exists");
      return;
    }

    const newUser = { name, email, password };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Account created successfully");
    setShowSignup(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0f2fe",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          color: "#111827",
          padding: "30px",
          borderRadius: "15px",
          width: "350px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2>📝 Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button onClick={signup} style={{ width: "100%", padding: "10px" }}>
          Create Account
        </button>

        <button
          onClick={() => setShowSignup(false)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Signup;