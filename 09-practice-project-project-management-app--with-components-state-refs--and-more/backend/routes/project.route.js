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
// // открытие страницы  для изменения данных о проекте
router.get("/project/:project/edit-project", projectController.getEditProject);
// пост запрос на удаление проекта+
router.delete("/project/:project/delete", projectController.deleteProject);
// //запрос на обновление данных проекта
router.put("/project/:project/update-project", projectController.putUpdateProject);

//пост запрос на создание задачи
router.post("/project/:project/create-task", validator.validationTask.text, projectController.postCreateTask);
// пост запрос на удаление задачи
router.delete("/project/:project/:task/delete-task", projectController.deleteTask);
// //запрос на обновление задачи
router.patch("/project/:project/:task/update-task", projectController.updateTask);

export default router;
