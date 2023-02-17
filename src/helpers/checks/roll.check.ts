import check from 'express';
import { validateNRolls } from "../../modules/roles/roles.middlewares";

export const rollSeederCheck: any = [
    validateNRolls
];