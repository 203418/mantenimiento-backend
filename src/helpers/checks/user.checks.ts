import { validateNUsers, validateRoll, validateUsername } from "../../modules/users/user.middlewares";
import { validateJWT } from "../middlewares/verifyJWT";

export const firsRegisterCheck: any = [
    validateNUsers,
];

export const registerCheck: any = [
    validateJWT,
    validateRoll,
    validateUsername,
];

