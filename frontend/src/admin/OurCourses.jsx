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

export default function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/admin/our-courses`, { withCredentials: true });
      setCourses(res.data.courses || []);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/course/${id}`, { withCredentials: true });
      toast.success("Course deleted");
      fetchCourses();
    } catch (e) {
      toast.error("Failed to delete");
    }
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
        <SidebarLink to="/admin/dashboard" icon="📊" label="Dashboard" />
        <SidebarLink to="/admin/create-course" icon="➕" label="Create Course" />
        <SidebarLink to="/admin/our-courses" icon="📚" label="Our Courses" active={true} />
        <SidebarLink to="/" icon="🌐" label="View Site" />

        <div style={{ flex: 1 }} />

        <div style={{ background: "#F8F8F8", borderRadius: "12px", padding: "12px", marginBottom: "1rem" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A" }}>{admin?.admin?.firstName} {admin?.admin?.lastName}</div>
          <div style={{ fontSize: "12px", color: "#64748B" }}>{admin?.admin?.email}</div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "2.5rem" }}>
        <div style={{ display: "inline-block", background: "#FFF3E0", color: "#E65100", fontSize: "11px", fontWeight: "700", padding: "4px 12px", borderRadius: "100px", letterSpacing: "1px", marginBottom: "1rem" }}>ADMIN</div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>Our Courses</h1>
            <p style={{ color: "#64748B", fontSize: "14px" }}>{courses.length} courses published</p>
          </div>
          <Link to="/admin/create-course" style={{ background: "#0F5F5A", color: "white", padding: "10px 20px", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
            ➕ Add Course
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "#888" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", background: "white", borderRadius: "16px", border: "1px solid #E8E8E8" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>No courses yet</h2>
            <p style={{ color: "#64748B", marginBottom: "1.5rem", fontSize: "14px" }}>Create your first course to get started</p>
            <Link to="/admin/create-course" style={{ background: "#0F5F5A", color: "white", padding: "12px 24px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}>Create Course</Link>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0", background: "#FAFAFA" }}>
                  {["COURSE", "PRICE", "ACTIONS"].map((h) => (
                    <th key={h} style={{ fontSize: "11px", fontWeight: "700", color: "#94A3B8", letterSpacing: "1px", textAlign: "left", padding: "14px 20px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} style={{ borderBottom: "1px solid #F8F8F8" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "52px", height: "52px", borderRadius: "10px", overflow: "hidden", background: "#E8F5F3", flexShrink: 0 }}>
                          {course.image?.url
                            ? <img src={course.image.url} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📚</div>
                          }
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "4px" }}>{course.title}</div>
                          <div style={{ fontSize: "12px", color: "#64748B" }}>{course.description?.slice(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F5F5A" }}>${course.price}</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link to={`/admin/update-course/${course._id}`} style={{
                          background: "#E8F5F3", color: "#0F5F5A",
                          padding: "8px 14px", borderRadius: "8px",
                          textDecoration: "none", fontSize: "13px", fontWeight: "600"
                        }}>✏️ Edit</Link>
                        <button onClick={() => handleDelete(course._id)} style={{
                          background: "#FFF0F0", color: "#E24B4A",
                          border: "none", padding: "8px 14px", borderRadius: "8px",
                          fontSize: "13px", fontWeight: "600", cursor: "pointer"
                        }}>🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}