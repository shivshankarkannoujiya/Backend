import { Router } from "express";
import { createTodo, getTodo } from '../controllers/todo.controller';


const router = Router();
router.route('/create').post(createTodo);
router.route('/:userId').get(getTodo);


export default router