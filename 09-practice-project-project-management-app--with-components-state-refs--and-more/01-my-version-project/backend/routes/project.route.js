import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";

const router = Router();
//начальная страница
router.get("/", projectController.getHome);
//страница создания нового проекта
router.get("/create-project", projectController.getCreateProject);
// пост запрос на создание нового проекта
router.post("/create-project/create", projectController.postCreateProject);
// get запрос для просмотра конкретного проекта
router.get("/project/:project", projectController.getProject);

// пост запрос на удаление проекта
router.delete("/project/:project/delete", projectController.deleteProject);
// // открытие страницы изменения для изменения данных
// router.get("/:project/update-project", projectController.getUpdateProject);

// //запрос на обновление данных проекта
// router.patch("/:project/update-project", projectController.putUpdateProject);

//пост запрос на создание задачи
router.post("/project/:project/create-task", projectController.postCreateTask);
// пост запрос на удаление задачи
router.delete("/project/:project/:task/delete-task", projectController.deleteTask);
// //запрос на обновление задачи
// router.patch("/:project/delete-task", projectController.deleteTask);

export default router;
