import { Request, Response } from "express";
import { processData } from "../../declarations";
import ProcessRepository from "./process.repository";

export default class ProcessController {

    constructor(private readonly repository: ProcessRepository){}

    async register(req: Request, res: Response) {
        const {name, object, identifier, indicators, flujo_digram, participantes, evidencia_entrada, evidencia_salida, frecuencia, fase, idR} = req.body;
        const process = await this.repository.registerProcess({
            name, object, identifier, indicators, flujo_digram, participantes,
            evidencia_entrada, evidencia_salida,frecuencia, fase, idR
        });
        if (process === 1){
            return res.status(400).json({msg: 'Error al crear el proceso'});
        }
        return res.status(200).json(process);
    }
}