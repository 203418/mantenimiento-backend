import { Router } from "express";
import ManualController from "./manual.controller";
import ManualRepository from "./manual.repository";

const manualController = new ManualController(new ManualRepository());

const manualRouter = Router();

manualRouter.post('/pdf-proceso', manualController.save_pdf.bind(manualRouter));

export default manualRouter;