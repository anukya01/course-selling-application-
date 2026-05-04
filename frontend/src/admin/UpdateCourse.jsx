import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

export default function UpdateCourse() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const token = admin?.token;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/course/${id}`, {
          withCredentials: true,
        });
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setPreview(data.course.image.url);
        setLoading(false);
      } catch (e) {
        toast.error("Failed to fetch course data");
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

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
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("imageUrl", image);
      await axios.put(`${BACKEND_URL}/course/update/${id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course updated successfully!");
      window.location.href = "/admin/our-courses";
    } catch (error) {
      toast.error(error.response?.data?.errors || "Failed to update");
    } finally {
      setUpdating(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: "10px",
    border: "1.5px solid #E0E0E0", fontSize: "14px", outline: "none",
    boxSizing: "border-box", background: "#FAFAFA"
  };

  if (loading) return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F4F8" }}>
      <div style={{ textAlign: "center", color: "#888" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
        Loading course...
      </div>
    </div>
  );

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

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>Update Course</h1>
          <p style={{ color: "#64748B", fontSize: "14px" }}>Edit your course details</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>

          {/* Form */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "2rem" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Course Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
                  rows={5} style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }} />
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Price ($)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Course Image</label>
                <input type="file" accept="image/*" onChange={handleImage} style={{ fontSize: "14px" }} />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link to="/admin/our-courses" style={{
                  flex: 1, textAlign: "center", padding: "14px", borderRadius: "10px",
                  border: "1.5px solid #E0E0E0", color: "#555",
                  textDecoration: "none", fontSize: "15px", fontWeight: "600"
                }}>Cancel</Link>
                <button type="submit" disabled={updating} style={{
                  flex: 1, padding: "14px", borderRadius: "10px",
                  background: updating ? "#7CB9B4" : "#0F5F5A", color: "white",
                  border: "none", fontSize: "15px", fontWeight: "700", cursor: updating ? "not-allowed" : "pointer"
                }}>
                  {updating ? "Updating..." : "Update Course"}
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "1rem" }}>Preview</h3>
            <div style={{ height: "200px", background: "#F0F4F8", borderRadius: "10px", overflow: "hidden", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {preview
                ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ color: "#94A3B8", fontSize: "14px" }}>Image preview</span>
              }
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>{title}</div>
            <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "1rem", lineHeight: "1.6" }}>{description?.slice(0, 100)}...</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0F5F5A" }}>${price}</div>
          </div>
        </div>
      </main>
    </div>
  );
}