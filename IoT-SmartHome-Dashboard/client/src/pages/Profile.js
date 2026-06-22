import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem("userProfile")) || {
        name: "Devika",
        email: "devika@gmail.com",
        phone: "",
        address: "",
      };

    setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify(profile)
    );

    alert("✅ Profile Updated Successfully");
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#111827",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        width: "500px",
      }}
    >
      <h1>👤 User Profile</h1>

      <label>Name</label>
      <br />
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <label>Email</label>
      <br />
      <input
        type="email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <label>Phone Number</label>
      <br />
      <input
        type="text"
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <label>Address</label>
      <br />
      <textarea
        name="address"
        value={profile.address}
        onChange={handleChange}
        rows="3"
        style={{ width: "100%", padding: "10px" }}
      />

      <br />
      <br />

      <button
        onClick={saveProfile}
        style={{
          backgroundColor: "#0ea5e9",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        💾 Save Profile
      </button>
    </div>
  );
}

export default Profile;