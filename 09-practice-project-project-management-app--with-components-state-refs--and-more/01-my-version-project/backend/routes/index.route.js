import { Router } from "express";
import projectRoute from "./project.route.js";

const router = Router();

router.use("/", projectRoute);

export default router