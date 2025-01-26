import { Request, Response} from 'express';
import { addTodo, fetchTodo } from '../services/todo.services';
import { z } from 'zod';


const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    userId: z.number(),
});


export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { success, data } = todoSchema.safeParse(req.body);
    
        if (!success) {
            res
                .status(411)
                .json({
                    message: 'Invalid inputs'
                })
            return;
        }
    
        const { title, description, userId } = data;
        const todo = addTodo(title, description, userId);
    
         res
            .status(201)
            .json({
                message: 'Todo added successfully',
                todoId: (await todo).id
            })
    } catch (error) {
        console.error('Error while adding Todo: ', error)
         res
            .status(500)
            .json({
                message: 'Something went wrong while adding Todo'
            })
    }
}


export const getTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
             res
                .status(400)
                .json({
                    error: 'Invalid userId, Please provide a valid userId'
                })
            return;
        }

        const todos = await fetchTodo(userId);
         res
            .status(200)
            .json({
                message: 'Todos fetched successfully',
                todos: todos
            })

    } catch (error) {
        console.error('Error while fetching the Todo', error)
         res
            .status(500)
            .json({
                message: 'Something went wrong while fetching Todo'
            })
    }
};


