import { Router } from "express";
import PhaseController from "./phases.controller";
import PhaseRepository from "./phases.repository";


const phasesController = new PhaseController(new PhaseRepository());

const phaseRouter = Router();

phaseRouter.get('/get/:id', phasesController.getById.bind(phasesController));

phaseRouter.get('/get_all', phasesController.readPhases.bind(phasesController));

phaseRouter.post('/register', phasesController.registerPhase.bind(phasesController));

phaseRouter.put('/update/:id', phasesController.updatePhase.bind(phasesController));

phaseRouter.delete('/delete/:id', phasesController.deletePhase.bind(phasesController));

export default phaseRouter;