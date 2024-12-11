import { Router } from "express";
import { loginAdmin, signupAdmin } from "../controllers/admin.controllers.js";

const router = Router()

router.route("/signup").post(signupAdmin)
router.route("/login").post(loginAdmin)

export default router