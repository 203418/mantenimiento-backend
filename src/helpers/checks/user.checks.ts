import { validateNUsers, validateRoll, validateUsername } from "../../modules/users/user.middlewares";
import { validateJWT } from "../middlewares/verifyJWT";

export const firsRegisterCheck: any = [
    validateNUsers,
];

export const getUsersDifferentsOfId: any = [
    validateJWT,
    validateRoll,
]

export const registerCheck: any = [
    validateJWT,
    validateRoll,
    validateUsername,
];

export const deleteUserOfId: any = [
    validateJWT,
    validateRoll,
]

export const updateUserOfId: any = [
    validateJWT,
    validateRoll,
]
