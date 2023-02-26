import { validateJWT } from "../middlewares/verifyJWT";
import { validateQualityManager, validatePhaseName } from "../../modules/phases/phases.middlewares"; 

export const registerPhasesCheck: any = [
    validateJWT,
    validateQualityManager
]

export const namePhaseCheck: any = [
    validateJWT,
    validatePhaseName
]