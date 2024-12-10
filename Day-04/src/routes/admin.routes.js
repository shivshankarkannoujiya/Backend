import { Router } from "express";
import { signupAdmin } from "../controllers/admin.controllers.js";

const router = Router()

router.route("/signup").post(signupAdmin)

export default router