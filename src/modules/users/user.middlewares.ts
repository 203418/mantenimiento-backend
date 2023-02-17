import { NextFunction, Request, Response } from "express";
import RollRepository from "../roles/roles.repository";
import User from "./users.model";
import UserRepository from "./users.repository";
import { roll } from "../../declarations";

export const validateNUsers = async (req: Request, res: Response, next: NextFunction) => {
    const numberOfUser = await UserRepository.getNUsers();
    const nRolls = await RollRepository.getNRolls();
    if (numberOfUser > 0) {
        return res.status(400).json({
            msg: 'Solo se puede registrar el gerente en la primera ejecución del programa'
        });
    }
    if (nRolls <= 0)
        return res.status(400).json({
            msg: 'No hay roles existentes para registrar a este usuario'
        });
    req.body.rolls = ["MANAGER"];
    next();
};

export const validateRoll = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body.user;
    const rolls: roll[] = user.rolls.map(r => r.name);
    if (!rolls.includes("MANAGER") && !rolls.includes("QUALITY MANAGER"))
        return res.status(401).json({
            message: "Este rol no tiene permisos para agregar usuarios"
        });
    next();
}

export const validateUsername = async (req: Request, res: Response, next: NextFunction) => {
    const credentials = await UserRepository.getCredentials(req.body.username);
    if (credentials)
        return res.status(401).json({
            message: "Este nombre de usuario ya existe"
        });
    next();
}