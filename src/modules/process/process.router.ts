import { Router } from "express";
import ProcessController from "./process.controller";
import ProcessRepository from "./process.repository";

const processController = new ProcessController(new ProcessRepository());

const processRouter = Router();

processRouter.post('/register-process', processController.register.bind(processController));

export default processRouter;