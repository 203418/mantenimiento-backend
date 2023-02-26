import { Request, Response, Router } from "express";
import { validationResult } from "express-validator";
import { createChecks, updateChecks } from "../../helpers/checks/process.check";
import ProcessController from "./process.controller";
import ProcessRepository from "./process.repository";

const processController = new ProcessController(new ProcessRepository());

const processRouter = Router();

processRouter.post('/register', createChecks, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    processController.register.bind(processController)(req, res);
});

processRouter.put('/update/:id', updateChecks, processController.update.bind(processController));

processRouter.delete('/delete/:id', updateChecks, processController.delete.bind(processController));

processRouter.get('/', updateChecks, processController.show.bind(processController));

processRouter.get('/:id', updateChecks, processController.showById.bind(processController));

processRouter.get('/fase/:id', updateChecks, processController.showByPhase.bind(processController));

export default processRouter;