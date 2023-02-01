import { Router } from "express";
import { rollSeederCheck } from "../../helpers/checks/roll.check";
import RollController from "./roles.controller";
import RollRepository from "./roles.repository";

const rollController = new RollController(new RollRepository());

const rollRouter = Router();

rollRouter.get('/getRolls', rollController.getRolls.bind(rollController));

rollRouter.post('/roll-factory', rollSeederCheck, rollController.registerRolls.bind(rollController));

export default rollRouter;