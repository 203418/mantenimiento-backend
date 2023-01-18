import { NextFunction, Request, Response } from "express";
import database from "../../bootstrap/database";
import Roll from "./roles.model";
import RollRepository from "./roles.repository";

export const validateNRolls = async (req: Request, res: Response, next: NextFunction) => {
   const numberOfRolls = await RollRepository.getNRolls();
    if (numberOfRolls > 0)
        return res.status(400).json({
            msg: 'Solo se puede efectuar el seed en la primera ejecución del programa'
        });
    next();
};