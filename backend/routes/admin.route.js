import express from "express";
import { login, logout, signup, getStats } from "../controllers/admin.controller.js";
import adminMiddleware from "../middlewares/admin.mid.js";
import { createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/stats", adminMiddleware, getStats);
router.get("/our-courses", adminMiddleware, getCourses);
router.post("/create-course", adminMiddleware, createCourse);
router.put("/update-course/:id", adminMiddleware, updateCourse);
router.delete("/delete-course/:id", adminMiddleware, deleteCourse);

export default router;