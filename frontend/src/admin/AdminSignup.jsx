import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "../components/Navbar";

export default function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/admin/signup`, { firstName, lastName, email, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      window.location.href = "/admin/login";
    } catch (error) {
      setErrorMessage(error.response?.data?.errors || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: "10px",
    border: "1.5px solid #E0E0E0", fontSize: "14px", outline: "none",
    boxSizing: "border-box", background: "#FAFAFA"
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", minHeight: "100vh", background: "#F0F4F8", display: "flex", flexDirection: "column" }}>

      <Navbar />

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2rem" }}>
        <div style={{ background: "white", borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: "460px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Logo - dark navy */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "56px", height: "56px", background: "#0F172A", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: "800", fontSize: "24px" }}>C</span>
            </div>
          </div>

          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0F172A", textAlign: "center", marginBottom: "0.4rem", letterSpacing: "-0.5px" }}>Create admin account</h1>
          <p style={{ color: "#64748B", fontSize: "14px", textAlign: "center", marginBottom: "2rem" }}>Set up your admin access to manage CoursePulse</p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>First name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Last name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Doe" style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Work email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@coursepulse.com" style={inputStyle} />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "42px" }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {errorMessage && <p style={{ color: "#E24B4A", fontSize: "13px", marginBottom: "1rem", textAlign: "center" }}>{errorMessage}</p>}
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "14px", borderRadius: "10px",
              background: loading ? "#7CB9B4" : "#0F172A", color: "white",
              border: "none", fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer"
            }}>
              {loading ? "Creating account..." : "Create admin account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "14px", color: "#64748B" }}>
            Already have an admin account?{" "}
            <Link to="/admin/login" style={{ color: "#0F5F5A", fontWeight: "700", textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}