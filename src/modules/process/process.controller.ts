import { Request, Response, Express } from "express";
import { processData } from "../../declarations";
import Evidence from "./evidencia.model";
import EvidencyRepository from "./evidencia.repository";
import ProcessRepository from "./process.repository";


export default class ProcessController {

    constructor(private readonly repository: ProcessRepository){}



    
    async show(req: Request, res: Response){
        const process = await this.repository.showProcesses();
        return res.json(process);
    }

    async showByPhase(req: Request, res: Response){
        const phase_id = req.params.id;
        const processes = await this.repository.showByPhase(+phase_id);
        return res.json(processes);
    }
    async showById(req: Request, res: Response){
        const process_id = req.params.id;
        const process = await this.repository.showById(+process_id);
        return res.json(process);
    }

    async register(req: Request, res: Response) {
        const {name, responsable_id, phase_id} = req.body;
        const user = req.body;
        const process = await this.repository.registerProcess({name, responsable_id, phase_id});
        if (typeof process === 'number'){
            let response = "";
            switch(process){
                case 1: response = "Error al crear el proceso"; break;
                case 2: response = "La fase ingresada no existe"; break;
                case 3: response = "El rol ingresado no existe"; break;
            }
            return res.status(200).json({msg: response})
        }
        const nameR = process.responsable.name;
        delete process.responsable;
        delete process.participants;
        delete process.fase;
        return res.status(200).json({...process, responbale: nameR});
    }

    async update(req:Request, res: Response) {
        const {user, ...data} = req.body;
        console.log(1);
        const id = req.params.id;
        if (!data) return res.status(200).json({msg: "No hay nada para actualizar"});
        let evidenceEntries: Evidence[] = [];
        let evidenceOutputs: Evidence[] = [];
        const evidenciaRepo = new EvidencyRepository();
        if (req.files && Object.keys(req.files).length > 0 && req.files.entries) {
            const filesArray = Object.values(req.files.entries);
            evidenceEntries = await evidenciaRepo.createEvidence(filesArray, 'entries/');  
        }
        if (req.files && Object.keys(req.files).length > 0 && req.files.outputs){
            const filesArray2 = Object.values(req.files.outputs);
            evidenceOutputs = await evidenciaRepo.createEvidence(filesArray2, 'outputs/');
        }
        const process: any = await this.repository.updateProcess({...data, evidenceEntries, evidenceOutputs}, +id, user);
        if (typeof process === 'number'){
            return res.status(500).json({msg: "Error al guardar el proceso"});
        }
        return res.json({...process, last_editor: process.last_editor});
    }

    async delete(req: Request, res: Response){
        const id = req.params.id;
        const process = await this.repository.deleteProcess(+id);
        if (process === 1)
            return res.status(500).json({msg: "Error al eliminar el proceso"})
        return res.status(200).json({msg: "Eliminado con éxito"})
    }
}