import React, { useState } from "react";
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

export default function CourseCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
      setImage(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = admin?.token;
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);
      await axios.post(`${BACKEND_URL}/course/create`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course created!");
      window.location.href = "/admin/our-courses";
    } catch (error) {
      toast.error(error.response?.data?.errors || "Failed to create course");
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
        <SidebarLink to="/admin/create-course" icon="➕" label="Create Course" active={true} />
        <SidebarLink to="/admin/our-courses" icon="📚" label="Our Courses" />
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

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>Create Course</h1>
          <p style={{ color: "#64748B", fontSize: "14px" }}>Add a new course to CoursePulse</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Form */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "2rem" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Course Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Introduction to Python" style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe what students will learn..."
                  rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }} />
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Price ($)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="49" style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Course Image</label>
                <input type="file" accept="image/*" onChange={handleImage} style={{ fontSize: "14px" }} />
              </div>
              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "14px", borderRadius: "10px",
                background: loading ? "#7CB9B4" : "#0F5F5A", color: "white",
                border: "none", fontSize: "15px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer"
              }}>
                {loading ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>

          {/* Preview */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "1rem" }}>Preview</h3>
              <div style={{ height: "200px", background: "#F0F4F8", borderRadius: "10px", overflow: "hidden", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {preview
                  ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ color: "#94A3B8", fontSize: "14px" }}>Image preview</span>
                }
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>{title || "Course Title"}</div>
              <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "1rem", lineHeight: "1.6" }}>{description ? description.slice(0, 100) + "..." : "Course description will appear here"}</div>
              <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0F5F5A" }}>{price ? `$${price}` : "$0"}</div>
            </div>

            <div style={{ background: "#E8F5F3", borderRadius: "14px", padding: "1.25rem" }}>
              <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#0F5F5A", marginBottom: "0.75rem" }}>📋 Tips</h4>
              <ul style={{ fontSize: "13px", color: "#374151", lineHeight: "1.8", paddingLeft: "1.25rem", margin: 0 }}>
                <li>Use a clear, descriptive title</li>
                <li>Add a high quality course image</li>
                <li>Write a detailed description</li>
                <li>Set a competitive price</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}