import { createTodo, getTodoByUserId } from '../models/todo.model';

export const addTodo = async (
    title: string,
    description: string,
    userId: number,
) => {
    return createTodo(title, description, userId);
};

export const fetchTodo = async (userId: number) => {
    return getTodoByUserId(userId);
};
