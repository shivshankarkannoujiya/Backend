import { Router } from "express";
import { createCourse } from "../controllers/course.controllers.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router()


router.route("/create").post(adminMiddleware, createCourse)


export default router