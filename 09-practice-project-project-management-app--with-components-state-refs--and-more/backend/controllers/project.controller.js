import ProjectSchema from "../models/project.model.js";
import TaskSchema from "../models/task.model.js";
import { validationResult } from "express-validator";
// /
async function getHome(req, res, next) {
    try {
        const projects = await ProjectSchema.find().populate("tasks", "_id text");
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
        const project = await ProjectSchema.findById(projectId).populate("tasks", "_id text");
        if (!project) {
            const error = new Error("Project not found.");
            error.statusCode = 404;
            throw error;
        }

        const task = await TaskSchema;

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
    try {
        const project = await ProjectSchema.findById(projectId).populate("tasks", "_id text");

        if (!project) {
            const error = new Error("Project not found.");
            error.statusCode = 404;
            throw error;
        }

        await TaskSchema.deleteMany({ project: projectId });
        await ProjectSchema.findByIdAndDelete(projectId);
        res.status(200).json({
            message: "Project and all its tasks successfully deleted",
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
// GET/project/:project/edit-project
async function getEditProject(req,res,next){
    try {
        res.status(200).json({
            message: `Successful ones got to the page "project edit".`,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

// PUT/project/:project/update-project
async function putUpdateProject(req, res, next) {
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newDueDate = req.body.dueDate;
    const projectId = req.params.project;
    try {
        const updatedProject = await ProjectSchema.findByIdAndUpdate(
            { _id: projectId },
            { $set: { title: newTitle, description: newDescription, dueDate: newDueDate } },
        );
        if (!updatedProject) {
            const error = new Error("The project could not be updated.");
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({ message: "Project successfully updated", project: updatedProject });
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
            task: newTask,
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
    const taskId = req.params.task;
    try {
        const deletedTask = await TaskSchema.findByIdAndDelete(taskId);
        if (!deletedTask) {
            const error = new Error("Task not found");
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
// PATCH/project/:project/:task/update-task
async function updateTask(req, res, next) {
    const taskId = req.params.task;
    const updatedText = req.body.text;
    try {
        const updateTask = await TaskSchema.findByIdAndUpdate({ _id: taskId }, { $set: { text: updatedText } });

        res.status(200).json({
            message: "Task successfully updated",
            task: updateTask,
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
    getEditProject,
    postCreateProject,
    getProject,
    deleteProject,
    putUpdateProject,
    postCreateTask,
    deleteTask,
    updateTask,
};
