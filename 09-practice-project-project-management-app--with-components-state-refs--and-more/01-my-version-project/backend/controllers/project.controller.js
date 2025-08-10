import ProjectSchema from "../models/project.model.js";
import TaskSchema from "../models/task.model.js";
import { validationResult } from "express-validator";
// /
async function getHome(req, res, next) {
    try {
        const projects = await Project.find();
        res.status(200).json({
            message: "Successfully got to the start page.",
            projects: projects,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// GET/create-project
async function getCreateProject(req, res, next) {
    try {
        res.status(200).json({
            message: `Successful ones got to the page "project creation".`,
        });
    } catch (error) {
        console.log(error);

        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// POST/create-project/create
async function postCreateProject(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const description = req.body.description;
    const dueDate = req.body.dueDate;

    try {
        const project = new ProjectSchema({
            title: title,
            description: description,
            dueDate: dueDate,
        });

        await project.save();
        res.status(201).json({
            message: "Project created successfully",
            project: project,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// /project/:project
async function getProject(req, res, next) {
    try {
        const projectId = req.params.project;

        if (!projectId) {
            const error = new Error("Project ID is required.");
            error.statusCode = 400;
            throw error;
        }
        const project = await ProjectSchema.findById(projectId);
        if (!project) {
            const error = new Error("Project not found.");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Project target page open",
            project: project,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// DELETE/project/:project/delete
async function deleteProject(req, res, next) {
    const projectId = req.params.project;
    if (!projectId) {
        const error = new Error("Project ID is required.");
        error.statusCode = 400;
        throw error;
    }
    const project = await ProjectSchema.findByIdAndDelete(projectId);
    if (!project) {
        const error = new Error("Project not found.");
        error.statusCode = 404;
        throw error;
    }
    try {
        res.status(200).json({
            message: "Project successfully deleted",
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// PATCH/:project/update-project
async function putUpdateProject(req, res, next) {
    try {
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// POST/project/:project/create-task
async function postCreateTask(req, res, next) {
    const text = req.body.text;
    const projectId = req.params.project;

    try {
        if (!projectId) {
            const error = new Error("Project ID is required.");
            error.statusCode = 400;
            throw error;
        }
        const newTask = new TaskSchema({ text: text, project: projectId });
        await newTask.save();

        const project = await ProjectSchema.findById(projectId);
        if (!project) {
            const error = new Error("Project not found.");
            error.statusCode = 404;
            throw error;
        }
        const projectWithTasks = project.tasks;
        projectWithTasks.push(newTask._id);
        await project.save();
        return res.status(201).json({
            message: "Task successfully created",
            project: project,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// DELETE/project/:project//delete-task
async function deleteTask(req, res, next) {
    const  taskId  = req.params.task;
    try {
        const deletedTask = await TaskSchema.findByIdAndDelete(taskId);
        if (!deletedTask) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Task successfully deleted",
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

export const projectController = {
    getHome,
    getCreateProject,
    postCreateProject,
    getProject,
    deleteProject,
    putUpdateProject,
    postCreateTask,
    deleteTask,
};
