import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import { body } from "express-validator";

const validationProject = {
    title: [body("title").isLength({ min: 1 }).trim()],
    description: [body("description").isLength({ min: 1 })],
    dueDate: [
        body("dueDate"),
        // .custom(value => {
        //     const inputDate = new Date(value);
        //     const today = new Date();
        //     if (inputDate > today) {
        //         throw new Error("Дата не может быть в будущем");
        //     }
        //     return true;
        // }),
    ],
};
const validationTask = {
    text: [body("text").isLength({ min: 1 }).trim()],
};

export const validator = {
    validationProject,
    validationTask,
};
