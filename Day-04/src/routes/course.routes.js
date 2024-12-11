import { Router } from "express";
import { createCourse, getAllCourses } from "../controllers/course.controllers.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router()


router.route("/create").post(adminMiddleware, createCourse)
router.route("/display").get(adminMiddleware, getAllCourses)


export default router