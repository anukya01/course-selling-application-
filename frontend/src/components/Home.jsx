import React, { useState } from "react";
import { Link } from "react-router-dom";

const CoursePulseLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="white"/>
    <path d="M6 22 L10 15 L15 19 L20 10 L26 17" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="26" cy="17" r="3" fill="#0F766E"/>
  </svg>
);

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#fff", minHeight: "100vh" }}>

      <nav style={{ background: "#0D9488", padding: "0 3rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CoursePulseLogo />
            <span style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>CoursePulse</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
          {[["Home", "/"], ["Courses", "/courses"], ["My Learning", "/purchases"], ["Admin", "/admin/dashboard"]].map(([label, to]) => (
              <Link key={label} to={to} style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: "14px", fontWeight: "500" }}>{label}</Link>
            ))}
          </div>
        </div>


        <div style={{ display: "flex", gap: "10px", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
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
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSignupDropdownOpen(!signupDropdownOpen)}
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
          </div>
        
      </nav>

      <section style={{ background: "#0F5F5A", padding: "5rem 3rem 6rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: "800", color: "white", lineHeight: "1.05", letterSpacing: "-2px", maxWidth: "700px", marginBottom: "1.5rem" }}>
            Master new skills,<br />one course at a time.
          </h1>
          <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", maxWidth: "520px", lineHeight: "1.7", marginBottom: "2.5rem" }}>
            CoursePulse is a focused course platform for developers, designers and curious minds. Learn from instructors who actually ship.
          </p>
          <div style={{ display: "flex", gap: "14px" }}>
            <Link to="/courses" style={{ padding: "14px 28px", borderRadius: "10px", background: "white", color: "#0D9488", textDecoration: "none", fontSize: "15px", fontWeight: "700" }}>Browse courses</Link>
            <Link to="/signup" style={{ padding: "14px 28px", borderRadius: "10px", border: "2px solid rgba(255,255,255,0.6)", color: "white", textDecoration: "none", fontSize: "15px", fontWeight: "600" }}>Create free account</Link>
          </div>
        </div>
      </section>


      <section style={{ padding: "5rem 3rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "800", color: "#0F172A", textAlign: "center", letterSpacing: "-1px", marginBottom: "0.5rem" }}>Built for focused learners</h2>
          <p style={{ textAlign: "center", color: "#64748B", fontSize: "1rem", marginBottom: "3rem" }}>Everything you need to actually finish a course.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "◐", title: "Project-based", desc: "Every course is built around real projects you can put in your portfolio." },
              { icon: "✦", title: "Lifetime access", desc: "Buy once, learn forever. Updates and new lessons included." },
              { icon: "◇", title: "Active community", desc: "Q&A, code reviews, and study groups with fellow students." }
            ].map((f) => (
              <div key={f.title} style={{ background: "white", border: "1px solid #E8E8E8", borderRadius: "14px", padding: "2rem" }}>
                <div style={{ width: "48px", height: "48px", background: "#E6FAF8", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "#0D9488", marginBottom: "1.25rem" }}>{f.icon}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.6", margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#0F172A", padding: "5rem 3rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "800", color: "white", letterSpacing: "-1px", marginBottom: "0.75rem" }}>Start learning today.</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", fontSize: "1rem" }}>Free account, no credit card required.</p>
        <Link to="/signup" style={{ display: "inline-block", background: "#0F5F5A", color: "white", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", fontSize: "15px", fontWeight: "700" }}>Create your account</Link>
      </section>

    </div>
  );
}