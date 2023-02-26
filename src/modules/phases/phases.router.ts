import { Router } from "express";
import PhaseController from "./phases.controller";
import PhaseRepository from "./phases.repository";
import { registerPhasesCheck, namePhaseCheck } from "../../helpers/checks/phases.check";

const phasesController = new PhaseController(new PhaseRepository());

const phaseRouter = Router();

phaseRouter.get('/get/:id', registerPhasesCheck, phasesController.getById.bind(phasesController));

phaseRouter.get('/get_all',registerPhasesCheck, phasesController.readPhases.bind(phasesController));

phaseRouter.post('/register',namePhaseCheck, phasesController.registerPhase.bind(phasesController));

phaseRouter.put('/update/:id',registerPhasesCheck, phasesController.updatePhase.bind(phasesController));

phaseRouter.delete('/delete/:id',registerPhasesCheck, phasesController.deletePhase.bind(phasesController));

export default phaseRouter;