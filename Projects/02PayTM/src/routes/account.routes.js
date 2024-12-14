import { Router } from "express";
import { getBalance } from "../controllers/account.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/balance").get(authMiddleware, getBalance);

export default router;
