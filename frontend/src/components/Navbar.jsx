import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("user");

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
      toast.success("Logged out");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <nav style={{ background: "#0F5F5A", padding: "0 3rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 999 }}>
      
      {/* Left - Logo + Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "32px", height: "32px", background: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#0F5F5A", fontWeight: "800", fontSize: "16px" }}>C</span>
          </div>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>CoursePulse</span>
        </Link>
        <div style={{ display: "flex", gap: "24px" }}>
            {[["Home", "/"], ["Courses", "/courses"], ["My Learning", "/purchases"]].map(([label, to]) => (
                <Link key={label} to={to} style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>{label}</Link>
            ))}
            {localStorage.getItem("admin") && (
                <Link to="/admin/dashboard" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>Admin</Link>
            )}
        </div>
      </div>

      {/* Right - Buttons */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: "8px 18px", borderRadius: "8px", border: "1.5px solid white", color: "white", background: "transparent", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <>
            {/* Sign in dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setDropdownOpen(!dropdownOpen); setSignupDropdownOpen(false); }}
                style={{ padding: "8px 18px", borderRadius: "8px", border: "1.5px solid white", color: "white", background: "transparent", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                Sign in <span style={{ fontSize: "10px" }}>▼</span>
              </button>
              {dropdownOpen && (
                <div style={{ position: "absolute", top: "44px", right: 0, background: "white", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", padding: "8px", width: "240px", zIndex: 999 }}>
                  <Link to="/login" onClick={() => setDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", textDecoration: "none", color: "#0F172A" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F8F8F8"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: "36px", height: "36px", background: "#E6FAF8", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>◐</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700" }}>Sign in as student</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>Continue your courses</div>
                    </div>
                  </Link>
                  <Link to="/admin/login" onClick={() => setDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", textDecoration: "none", color: "#0F172A" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F8F8F8"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: "36px", height: "36px", background: "#FFF3E0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⌘</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700" }}>Sign in as admin</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>Manage courses & students</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Get started dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => { setSignupDropdownOpen(!signupDropdownOpen); setDropdownOpen(false); }}
                style={{ padding: "8px 18px", borderRadius: "8px", background: "white", color: "#0F5F5A", fontSize: "14px", fontWeight: "700", cursor: "pointer", border: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                Get started <span style={{ fontSize: "10px" }}>▼</span>
              </button>
              {signupDropdownOpen && (
                <div style={{ position: "absolute", top: "44px", right: 0, background: "white", borderRadius: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", padding: "8px", width: "240px", zIndex: 999 }}>
                  <Link to="/signup" onClick={() => setSignupDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", textDecoration: "none", color: "#0F172A" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F8F8F8"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: "36px", height: "36px", background: "#E6FAF8", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>◐</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700" }}>Sign up as student</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>Start learning today</div>
                    </div>
                  </Link>
                  <Link to="/admin/signup" onClick={() => setSignupDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", textDecoration: "none", color: "#0F172A" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F8F8F8"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: "36px", height: "36px", background: "#FFF3E0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⌘</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "700" }}>Sign up as admin</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>Create & manage courses</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}