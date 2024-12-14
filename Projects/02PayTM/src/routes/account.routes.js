import { Router } from "express";
import {
    getBalance,
    transferBalance,
} from "../controllers/account.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/balance").get(authMiddleware, getBalance);
router.route("/transfer").post(authMiddleware, transferBalance);

export default router;
