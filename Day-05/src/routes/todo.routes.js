import { Router } from "express";
import {
    createTodos,
    getAllTodo,
    updatetodos,
} from "../controllers/todo.controllers.js";

const router = Router();

router.route("/create").post(createTodos);
router.route("/getTodos").get(getAllTodo);
router.route("/update").put(updatetodos);

export default router;
