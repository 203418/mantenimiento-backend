import { Request, Response, Express } from "express";
import { evidenceUrl, processData } from "../../declarations";
import Evidence from "./evidencia.model";
import EvidencyRepository from "./evidencia.repository";
import ProcessRepository from "./process.repository";
import { uploadArchive } from "../../helpers/validateExtension";
import { UploadedFile } from "express-fileupload";

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

    async showByRoll(req: Request, res: Response){
        const rol_id = req.params.id;
        const processes = await this.repository.showByRoll(+rol_id);
        return res.json(processes);
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
        delete process.participants;
        delete process.fase;
        return res.status(200).json(process);
    }

    async update(req:Request, res: Response) {
        const {user, output, entry, ...data} = req.body;
        const id = req.params.id;
        if (!data) return res.status(200).json({msg: "No hay nada para actualizar"});
        let evidenceEntries: Evidence[] = [];
        let evidenceOutputs: Evidence[] = [];
        let flow_chart: Evidence[]  | Evidence = [];
        const evidenciaRepo = new EvidencyRepository();
        if (req.files && Object.keys(req.files).length > 0 && req.files.flow_chart){
            const file = req.files.flow_chart as UploadedFile;
            flow_chart = await evidenciaRepo.createEvidence(file, 'flow_chart/');
            data.flujo_digram = flow_chart.url;
        }
        if (req.files && Object.keys(req.files).length > 0 && req.files.entries) {
            const filesArray = Object.values(req.files.entries);
            if (typeof filesArray[0] !== "string")
                evidenceEntries = await evidenciaRepo.createEvidences(filesArray, 'entries/');
            else{
                const file = req.files.entries as UploadedFile;
                const entryN = await evidenciaRepo.createEvidence(file, 'entries/');
                evidenceEntries.push(entryN);
            }
        }else if(entry){
            const evidenceC = await EvidencyRepository.createUrlE(entry);
            evidenceEntries.push(evidenceC);
        }
        if (req.files && Object.keys(req.files).length > 0 && req.files.outputs){
            const filesArray2 = Object.values(req.files.outputs);
            if (typeof filesArray2[0] !== "string")
                evidenceOutputs = await evidenciaRepo.createEvidences(filesArray2, 'outputs/');
            else {
                const file = req.files.outputs as UploadedFile;
                const outputN = await evidenciaRepo.createEvidence(file, 'outputs/');
                evidenceOutputs.push(outputN);
            }                
        }else if (output){
            const evidenceC = await EvidencyRepository.createUrlE(output);
            evidenceOutputs.push(evidenceC);
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
        return res.status(200).json(process);
    }
}