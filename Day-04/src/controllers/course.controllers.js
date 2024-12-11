import { Course } from "../models/course.models.js";

const createCourse = async (req, res) => {
    try {
        const { title, description, price, imageLink } = req.body;
        if (
            [title, description, price, imageLink].some(
                (field) => String(field)?.trim() === ""
            )
        ) {
            return res.status(401).json({
                message: "All fields are requied",
            });
        }

        const newCourse = await Course.create({
            title,
            description,
            price,
            imageLink,
        });

        const createdCourse = await Course.findById(newCourse._id);
        if (!createCourse) {
            return res.status(500).json({
                message: `Course is not created`,
            });
        }

        return res.status(201).json({
            data: {
                Course: createdCourse,
                courseId: createdCourse._id,
            },
            message: "Course created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: error?.message || `Error while creating Course`,
        });
    }
};

export { createCourse };
