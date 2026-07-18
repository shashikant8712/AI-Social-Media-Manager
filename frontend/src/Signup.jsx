import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";

export default function Signup({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSignup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    onBack(); // Login page par wapas
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#111827",
      }}
    >
      <div
        style={{
          background: "#1F2937",
          padding: "30px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h2 style={{ color: "white" }}>📝 Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
        />

        <button
  onClick={onSignup}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#10B981",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Create Account
</button>

        <button
          onClick={onBack}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}