import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "./Navbar";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error fetching courses", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#F0F4F8", minHeight: "100vh" }}>

      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>All Courses</h1>
            <p style={{ color: "#64748B", fontSize: "14px" }}>{filtered.length} courses available</p>
          </div>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1.5px solid #E0E0E0", borderRadius: "10px", padding: "10px 16px", width: "280px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: "14px", color: "#333", width: "100%", background: "transparent" }}
            />
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "#888" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
            Loading courses...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "#888" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            No courses found
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((course) => (
              <div key={course._id} style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Image */}
                <div style={{ height: "190px", overflow: "hidden", background: "#E8F5F3" }}>
                  {course.image?.url
                    ? <img src={course.image.url} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>📚</div>
                  }
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem" }}>
                  <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem", lineHeight: "1.4" }}>{course.title}</h2>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.6", marginBottom: "1rem" }}>
                    {course.description?.length > 80 ? course.description.slice(0, 80) + "..." : course.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0F5F5A" }}>${course.price}</span>
                    <Link to={`/buy/${course._id}`} style={{ background: "#0F5F5A", color: "white", padding: "8px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: "700" }}>
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}