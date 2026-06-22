import { useState } from "react";

function Login({ setIsLoggedIn, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (user) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
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
        <h2>🔐 Smart Home Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          Don't have an account?
        </p>

        <button
          onClick={() => setShowSignup(true)}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;