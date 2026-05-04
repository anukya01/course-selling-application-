import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "./Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/user/login`, { email, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/courses";
    } catch (error) {
      setErrorMessage(error.response?.data?.errors || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", minHeight: "100vh", background: "#F0F4F8", display: "flex", flexDirection: "column" }}>
      
      <Navbar />

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2rem" }}>
        <div style={{ background: "white", borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: "460px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "56px", height: "56px", background: "#0F5F5A", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: "800", fontSize: "24px" }}>C</span>
            </div>
          </div>

          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0F172A", textAlign: "center", marginBottom: "0.4rem", letterSpacing: "-0.5px" }}>Welcome back</h1>
          <p style={{ color: "#64748B", fontSize: "14px", textAlign: "center", marginBottom: "2rem" }}>Sign in to continue learning</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                placeholder="you@example.com"
                style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #E0E0E0", fontSize: "14px", outline: "none", boxSizing: "border-box", background: "#FAFAFA" }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "12px 42px 12px 14px", borderRadius: "10px", border: "1.5px solid #E0E0E0", fontSize: "14px", outline: "none", boxSizing: "border-box", background: "#FAFAFA" }}
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
              background: loading ? "#7CB9B4" : "#0F5F5A", color: "white",
              border: "none", fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer"
            }}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "14px", color: "#64748B" }}>
            New here?{" "}
            <Link to="/signup" style={{ color: "#0F5F5A", fontWeight: "700", textDecoration: "none" }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}