import { NextFunction, Request, Response } from "express";
import Phase from "./phases.model";
import PhaseRepository from "./phases.repository";
import User from "../users/users.model";
import { roll } from "../../declarations";

export const validateQualityManager = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body.user;
    const rolls: roll[] = user.rolls.map(r => r.name);
    if (!rolls.includes("QUALITY MANAGER"))
        return res.status(401).json({
            message: "Este rol no tiene permiso para agregar Fases"
        });
    next();
}

export const validatePhaseName = async (req: Request, res: Response, next: NextFunction) => {
    const phaseR = new PhaseRepository();
    const phase = await phaseR.getPhaseName(req.body.nombre);
    if(phase)
        return res.status(401).json({
            message:"Este nombre de fase ya existe"
        });
    next();
}
