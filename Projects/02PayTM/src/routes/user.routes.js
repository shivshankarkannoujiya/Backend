import { Router } from "express";
import {
    changePassword,
    signupUser,
    singinUser,
    updateInformation,
} from "../controllers/user.cntrollers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(singinUser);
router.route("/update").put(authMiddleware, updateInformation);
router.route("/changepassword").put(authMiddleware, changePassword)

export default router;
