import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";
import { validator } from "../middleware/validation.middleware.js";

const router = Router();
const [validationTitle, validationDescription, validationDueDate] = [
    validator.validationProject.title,
    validator.validationProject.description,
    validator.validationProject.dueDate,
];
//начальная страница +
router.get("/", projectController.getHome);
//страница создания нового проекта+
router.get("/create-project", projectController.getCreateProject);
// пост запрос на создание нового проекта+
router.post("/create-project/create", validationTitle, validationDescription, validationDueDate, projectController.postCreateProject);
// get запрос для просмотра конкретного проекта+
router.get("/project/:project", projectController.getProject);

// пост запрос на удаление проекта+
router.delete("/project/:project/delete", projectController.deleteProject);

//пост запрос на создание задачи
router.post("/project/:project/create-task", validator.validationTask.text, projectController.postCreateTask);
// пост запрос на удаление задачи
router.delete("/project/:project/:task/delete-task", projectController.deleteTask);

export default router;
