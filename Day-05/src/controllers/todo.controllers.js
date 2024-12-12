import { Todo } from "../models/todo.models.js";
import { createTodo, updateTodo } from "../validator.js";

const createTodos = async (req, res) => {
    try {
        const payload = req.body;
        const parsepayload = createTodo.safeParse(payload);

        if (!parsepayload.success) {
            return res.status(411).json({
                message: "You sent the wrong Inputs",
            });
        }

        const newTodo = await Todo.create({
            title: payload.title,
            description: payload.description,
        });

        const createdTodo = await Todo.findById(newTodo._id);
        if (!createdTodo) {
            return res.status(500).json({
                message: "Failed to create Todo",
            });
        }

        return res.status(201).json({
            data: {
                Todo: createdTodo,
                todoId: createdTodo._id,
            },
            message: "Todo created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error?.message || "Something went wrong while creating Todo",
        });
    }
};

const getAllTodo = async (_, res) => {
    const todos = await Todo.find({});
    if (!todos) {
        return res.status(404).json({
            message: "No todo Found",
        });
    }

    return res.status(200).json({
        data: {
            todos,
        },
        message: "Todos fetched successfully",
    });
};

const updatetodos = async (req, res) => {
    try {
        const payload = req.body;
        const parsepayload = updateTodo.safeParse(payload);
        if (!parsepayload.success) {
            return res.status(411).json({
                message: "You have sent wrong Inputs",
            });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.body.id,
            {
                completed: true,
            },
            { new: true }
        );

        return res.status(200).json({
            updatedTodo: {
                updatedTodo,
            },
            message: "Todo marked as completed",
        });
    } catch (error) {
        return res.status(500).json({
            message:
                error?.message || "Something went wrong while updating todo",
        });
    }
};

export { createTodos, getAllTodo, updatetodos };
