import { check } from "express-validator"
import { validateGRoll, validateName } from "../../modules/process/process.middlewares";
import { validateJWT } from "../middlewares/verifyJWT";

export const createChecks: any = [
    validateJWT,
    validateGRoll,
    check('name', 'El nombre es requerido').not().isEmpty(),
    check("responsable_id", "El id del roll responsable es requerido y numércio").isNumeric(),
    check("phase_id", "El id de la fase es requerido y numérico").isNumeric(),
    validateName,
];

export const updateChecks: any = [
    validateJWT,
];