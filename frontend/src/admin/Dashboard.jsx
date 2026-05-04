import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

const SidebarLink = ({ to, icon, label, active }) => (
  <Link to={to} style={{
    display: "flex", alignItems: "center", gap: "10px",
    padding: "10px 14px", borderRadius: "10px",
    background: active ? "#E8F5F3" : "transparent",
    color: active ? "#0F5F5A" : "#555",
    textDecoration: "none", fontSize: "14px",
    fontWeight: active ? "700" : "500",
    marginBottom: "4px"
  }}>{icon} {label}</Link>
);

export default function Dashboard() {
  const [stats, setStats] = useState({ totalCourses: 0, totalStudents: 0, totalRevenue: 0, recentEnrollments: [] });
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/stats`, { withCredentials: true });
        setStats(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/admin/logout`, { withCredentials: true });
      localStorage.removeItem("admin");
      toast.success("Logged out");
      window.location.href = "/";
    } catch (e) { toast.error("Error logging out"); }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", display: "flex", minHeight: "100vh", background: "#F0F4F8" }}>

      {/* Sidebar */}
      <aside style={{ width: "240px", background: "white", borderRight: "1px solid #E8E8E8", padding: "1.5rem", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "2.5rem" }}>
          <div style={{ width: "32px", height: "32px", background: "#0F5F5A", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: "800", fontSize: "16px" }}>C</span>
          </div>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#0F5F5A" }}>CoursePulse</span>
        </Link>

        <p style={{ fontSize: "11px", fontWeight: "700", color: "#bbb", letterSpacing: "1px", marginBottom: "8px", paddingLeft: "14px" }}>MANAGE</p>
        <SidebarLink to="/admin/dashboard" icon="📊" label="Dashboard" active={true} />
        <SidebarLink to="/admin/create-course" icon="➕" label="Create Course" />
        <SidebarLink to="/admin/our-courses" icon="📚" label="Our Courses" />
        <SidebarLink to="/" icon="🌐" label="View Site" />

        <div style={{ flex: 1 }} />

        <div style={{ background: "#F8F8F8", borderRadius: "12px", padding: "12px", marginBottom: "1rem" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>{admin?.admin?.firstName} {admin?.admin?.lastName}</div>
          <div style={{ fontSize: "12px", color: "#64748B" }}>{admin?.admin?.email}</div>
        </div>

        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 14px", borderRadius: "10px", border: "none",
          background: "#FFF0F0", color: "#E24B4A", cursor: "pointer",
          fontSize: "14px", fontWeight: "600", width: "100%"
        }}>🚪 Logout</button>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "2.5rem" }}>

        <div style={{ display: "inline-block", background: "#FFF3E0", color: "#E65100", fontSize: "11px", fontWeight: "700", padding: "4px 12px", borderRadius: "100px", letterSpacing: "1px", marginBottom: "1rem" }}>ADMIN</div>

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>Dashboard</h1>
          <p style={{ color: "#64748B", fontSize: "14px" }}>Overview of platform activity this month.</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.2rem", marginBottom: "2.5rem" }}>
          {[
            { label: "TOTAL REVENUE", value: `$${stats.totalRevenue.toLocaleString()}`, sub: "from all purchases" },
            { label: "ACTIVE STUDENTS", value: stats.totalStudents, sub: "registered users" },
            { label: "COURSES LIVE", value: stats.totalCourses, sub: "published courses" },
            { label: "AVG. RATING", value: "4.8", sub: "across all courses" },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", borderRadius: "14px", border: "1px solid #E8E8E8", padding: "1.5rem" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#94A3B8", letterSpacing: "1px", marginBottom: "0.5rem" }}>{s.label}</div>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-1px", marginBottom: "0.25rem" }}>{loading ? "—" : s.value}</div>
              <div style={{ fontSize: "12px", color: "#0F5F5A", fontWeight: "600" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent Enrollments */}
        <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0F172A" }}>Recent enrollments</h2>
            <Link to="/admin/our-courses" style={{ fontSize: "13px", color: "#0F5F5A", fontWeight: "600", textDecoration: "none" }}>View all →</Link>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#888" }}>Loading...</div>
          ) : stats.recentEnrollments.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
              <p style={{ color: "#888", fontSize: "14px" }}>No enrollments yet</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  {["STUDENT", "COURSE", "DATE", "AMOUNT"].map((h) => (
                    <th key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#94A3B8", letterSpacing: "1px", textAlign: "left", padding: "0 0 12px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentEnrollments.map((e, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #F8F8F8" }}>
                    <td style={{ padding: "14px 0", fontSize: "14px", color: "#0F172A", fontWeight: "500" }}>{e.student}</td>
                    <td style={{ padding: "14px 0", fontSize: "14px", color: "#374151" }}>{e.course}</td>
                    <td style={{ padding: "14px 0", fontSize: "13px", color: "#64748B" }}>{e.date ? new Date(e.date).toLocaleDateString() : "—"}</td>
                    <td style={{ padding: "14px 0", fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>${e.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #F0F0F0" }}>
            <Link to="/admin/create-course" style={{ background: "#0F5F5A", color: "white", padding: "10px 20px", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>➕ Create New Course</Link>
            <Link to="/admin/our-courses" style={{ background: "#E8F5F3", color: "#0F5F5A", padding: "10px 20px", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>📚 Manage Courses</Link>
          </div>
        </div>
      </main>
    </div>
  );
}