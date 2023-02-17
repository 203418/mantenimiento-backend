import Model from "./manual.model";
import { Request, Response } from "express";
import ManualRepository from "./manual.repository";
import createPDF from "../../helpers/pdfs/createPDF";

export default class ManualController {
    constructor(private readonly repository: ManualRepository){}

    async save_pdf(req: Request, res: Response) {
        const {name, object, identifier, indicators, flujo_digramS, flujo_digramI, responsable, participantes, evidencia_entradaS, evidencia_entradaI, evidencia_salidaS, evidencia_salidaI, frecuencia, fase, last_edited, idR} = req.body;
        const pdf = createPDF(name, object, identifier, indicators, flujo_digramS, flujo_digramI, responsable, participantes, evidencia_entradaS, evidencia_entradaI, evidencia_salidaS, evidencia_salidaI, frecuencia, fase, last_edited)
        const process = await this.repository.registerManual({
            pdf,
        });
        if (process === 1){
            return res.status(400).json({msg: 'Error al crear el proceso'});
        }
        return res.status(200).json(process);
    }

}