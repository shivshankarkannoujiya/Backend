import { Request, Response } from "express";
import { createTodo, getTodoByUser } from "../models/todo.model";

export const addTodo = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.user?.id;

    const todo = await createTodo({
        title: title,
        description: description,
        userId
    })

    return res
        .status(201)
        .json({
            message: "Todo created successfully",
            todo: todo
        })
    
}


export const fetchTodo = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const todo = await getTodoByUser(userId);
    if (!todo) {
        return res
            .status(404)
            .json({
                message: "No todos find"
            })
    }
}