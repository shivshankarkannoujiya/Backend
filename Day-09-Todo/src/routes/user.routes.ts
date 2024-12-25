import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.schema";

const router = Router()

router.post("register", validate(registerSchema), registerUser)

export default router