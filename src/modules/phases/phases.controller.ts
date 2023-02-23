import { Request, Response } from "express";
import { PhaseData } from "../../declarations";
import PhaseRepository from "./phases.repository";


export default class PhaseController {
    constructor(private readonly repository: PhaseRepository){}
    async getById(req: Request, res: Response){
        const id = req.params.id;
        const phase = await this.repository.getById(Number(id));
        if (phase === 1)
            return res.status(400).json({msg: 'Error al leer la fase'});
        else if (phase === 2)
            return res.status(400).json({msg: 'No existe la fase a leer'});
        return res.status(200).json(phase);
    }
    async readPhases(req: Request, res: Response){
        const phases = await this.repository.readPhases();
        if (phases == 1)
            return res.status(400).json({msg: 'Error al leer las fases'});
        else if (phases == 2)
            return res.status(400).json({msg: 'No existen fases en el sistena'});
        return res.status(200).json(phases);
    }
    async deletePhase(req: Request, res: Response){
        const id = req.params.id;
        const resp = await this.repository.deletePhase(Number(id));
        if (resp == 0)
            return res.status(400).json({msg: 'Error al crear la fase'});
        else if (resp==2)
            return res.status(400).json({msg: 'No existe la fase a eliminar'});
        return res.status(200).json({msg: 'Fase eliminada exitosamente'});
    }
    async registerPhase(req: Request, res: Response){
        const data: PhaseData = req.body;
        const phase = await this.repository.registerPhase(data);
        if (phase === 1){
            return res.status(400).json({msg: 'Error al crear la fase'});
        }
        return res.status(200).json(phase);
    }
    async updatePhase(req: Request, res: Response){
        const data: PhaseData = req.body;
        const id = req.params.id;
        const phase = await this.repository.updatePhase(data, Number(id));
        if (phase === 1) 
            return res.status(400).json({msg: 'Error al Actualizar la fase'});
        else if (phase === 2)
            return res.status(400).json({msg: 'No existe la fase a actualizar'});
        return res.status(200).json(phase);
    }
}