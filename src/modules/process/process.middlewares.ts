import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { roll } from "../../declarations";
import User from "../users/users.model";
import Process from "./process.model";
import ProcessRepository from "./process.repository";


export const validateGRoll = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body.user;
    const rolls: roll[] = user.rolls.map(r => r.name);
    if (!rolls.includes("QUALITY MANAGER"))
        return res.status(401).json({
            message: "Este rol no tiene permisos para agregar usuarios"
        });
    next();
};

export const validateName = async (req: Request, res: Response, next: NextFunction) => {
    const process = await ProcessRepository.getByName(req.body.name);
    if (process)
        return res.status(400).json({msg: "Esa proceso ya se encuentra registrado"});
    next();
};
