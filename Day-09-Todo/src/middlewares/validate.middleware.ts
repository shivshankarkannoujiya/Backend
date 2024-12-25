import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body); 
        next();
    } catch (error) {
        if (error instanceof ZodError) {
           
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    path: err.path,
                    message: err.message,
                })),
            });
        }

        // Catch any unexpected errors
        return res.status(500).json({ message: "Internal server error" });
    }
};
