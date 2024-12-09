import { Router } from "express";
import { registerUser, logoutUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);

// secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
