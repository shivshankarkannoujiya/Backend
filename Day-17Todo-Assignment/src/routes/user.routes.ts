import { Router } from "express";
import { signUp } from '../controllers/user.controller';


const router = Router();
router.route('/signup').post(signUp)


export default router