import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "./Navbar";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          withCredentials: true,
        });
        setPurchases(response.data.purchases || []);
        setLoading(false);
      } catch (error) {
        console.log("error fetching purchases", error);
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#F0F4F8", minHeight: "100vh" }}>

      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "0.25rem" }}>My Learning</h1>
          <p style={{ color: "#64748B", fontSize: "14px" }}>Courses you've purchased</p>
        </div>

        {!isLoggedIn ? (
          <div style={{ textAlign: "center", padding: "5rem", background: "white", borderRadius: "20px", border: "1px solid #E8E8E8" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>Sign in to view your courses</h2>
            <p style={{ color: "#64748B", marginBottom: "1.5rem", fontSize: "14px" }}>You need to be logged in to see your purchased courses</p>
            <Link to="/login" style={{ background: "#0F5F5A", color: "white", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>Sign in</Link>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "5rem", color: "#888" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
            Loading your courses...
          </div>
        ) : purchases.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem", background: "white", borderRadius: "20px", border: "1px solid #E8E8E8" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📚</div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>No courses yet</h2>
            <p style={{ color: "#64748B", marginBottom: "1.5rem", fontSize: "14px" }}>Browse our courses and start learning today</p>
            <Link to="/courses" style={{ background: "#0F5F5A", color: "white", padding: "12px 28px", borderRadius: "10px", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>Explore Courses</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {purchases.map((course) => (
              <div key={course._id} style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", overflow: "hidden" }}>
                <div style={{ height: "180px", background: "#E8F5F3", overflow: "hidden" }}>
                  {course.image?.url
                    ? <img src={course.image.url} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>📚</div>
                  }
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <h2 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", marginBottom: "0.5rem" }}>{course.title}</h2>
                  <p style={{ fontSize: "13px", color: "#64748B", lineHeight: "1.6", marginBottom: "1rem" }}>
                    {course.description?.length > 80 ? course.description.slice(0, 80) + "..." : course.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ background: "#E8F5F3", color: "#0F5F5A", fontSize: "12px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px" }}>✓ Purchased</span>
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