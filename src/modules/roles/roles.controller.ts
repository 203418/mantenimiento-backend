import { Request, Response } from "express";
import { rollRepository } from "../../declarations";
import Roll from "./roles.model";

export default class RollController {
    constructor(private readonly repository: rollRepository<Roll>){}
    async registerRolls(req: Request, res: Response){
        const resp: number = await this.repository.registerRolls();
        if (resp === 0) {
            return res.status(201).json({
                message: "Roles guardados exitosamente",
            });
        }else {
            return res.status(400).json({
                message: "Error al guardar rolles",
            });
        }
    }
}