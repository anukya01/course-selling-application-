import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import Navbar from "./Navbar";

export default function Buy() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const isLoggedIn = !!localStorage.getItem("user");
  console.log("isLoggedIn:", isLoggedIn, localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        const found = response.data.courses.find((c) => c._id === courseId);
        setCourse(found);
        setLoading(false);
      } catch (error) {
        console.log("error fetching course", error);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleBuy = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setPurchasing(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/order`,
        { courseId, userId: JSON.parse(localStorage.getItem("user"))?.user?._id },
        { withCredentials: true }
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.success("Course purchased successfully!");
        navigate("/purchases");
      }
    } catch (error) {
      toast.error(error.response?.data?.errors || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", minHeight: "100vh", background: "#F0F4F8" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "5rem", color: "#888" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⏳</div>
        Loading course...
      </div>
    </div>
  );

  if (!course) return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", minHeight: "100vh", background: "#F0F4F8" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "5rem", color: "#888" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😕</div>
        Course not found
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#F0F4F8", minHeight: "100vh" }}>

      <Navbar />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>

          {/* Left - Image */}
          <div>
            <div style={{ borderRadius: "16px", overflow: "hidden", background: "#E8F5F3", height: "320px" }}>
              {course.image?.url
                ? <img src={course.image.url} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>📚</div>
              }
            </div>

            {/* What you'll learn */}
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "1.5rem", marginTop: "1.5rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#0F172A", marginBottom: "1rem" }}>What you'll learn</h3>
              {["Lifetime access to course content", "Learn at your own pace", "Certificate of completion", "Access on all devices"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#E8F5F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#0F5F5A", fontWeight: "700", flexShrink: 0 }}>✓</div>
                  <span style={{ fontSize: "14px", color: "#374151" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div>
            <div style={{ background: "white", borderRadius: "16px", border: "1px solid #E8E8E8", padding: "2rem", position: "sticky", top: "80px" }}>
              <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0F172A", letterSpacing: "-0.5px", marginBottom: "1rem", lineHeight: "1.3" }}>{course.title}</h1>
              <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.7", marginBottom: "1.5rem" }}>{course.description}</p>

              <div style={{ borderTop: "1px solid #F0F0F0", borderBottom: "1px solid #F0F0F0", padding: "1.25rem 0", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0F5F5A", letterSpacing: "-1px" }}>${course.price}</span>
                <span style={{ fontSize: "14px", color: "#64748B", marginLeft: "8px" }}>one-time payment</span>
              </div>

              <button
                onClick={handleBuy}
                disabled={purchasing}
                style={{
                  width: "100%", padding: "16px", borderRadius: "10px",
                  background: purchasing ? "#7CB9B4" : "#0F5F5A",
                  color: "white", border: "none", fontSize: "16px",
                  fontWeight: "700", cursor: purchasing ? "not-allowed" : "pointer",
                  marginBottom: "1rem"
                }}>
                {purchasing ? "Processing..." : isLoggedIn ? "Buy Now" : "Login to Purchase"}
              </button>

              {!isLoggedIn && (
                <p style={{ textAlign: "center", fontSize: "13px", color: "#64748B" }}>
                  You need to <a href="/login" style={{ color: "#0F5F5A", fontWeight: "700", textDecoration: "none" }}>sign in</a> to purchase this course
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "1rem" }}>
                {["30-day money back guarantee", "Secure payment", "Instant access after purchase"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#0F5F5A", fontSize: "14px" }}>✓</span>
                    <span style={{ fontSize: "13px", color: "#64748B" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}