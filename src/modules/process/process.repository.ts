import database from "../../bootstrap/database";
import { processCreate, processData, processRepository } from "../../declarations";
import { create } from "../../helpers/pdf_generation/pdf";
import Phase from "../phases/phases.model";
import Roll from "../roles/roles.model";
import User from "../users/users.model";
import Evidence from "./evidencia.model";
import PDF from "./pdf.model";
import Process from "./process.model";

export default class ProcessRepository implements processRepository<Process> {
    async registerProcess(data: processCreate): Promise<Process | number> {
        const {phase_id, responsable_id, name} = data;
        delete data.phase_id;
        delete data.responsable_id;
        if (phase_id === undefined && responsable_id===undefined) return 4;
        if (phase_id === undefined) return 5;
        if (responsable_id === undefined) return 6;
        try {
            const processR = database.getRepository(Process);
            const rollR = database.getRepository(Roll);
            const phaseR = database.getRepository(Phase);
            const phase = await phaseR.findOneBy({id: phase_id});
            const roll = await rollR.findOneBy({id: responsable_id});
            if (!phase) return 2;
            if (!roll) return 3;
            const process = processR.create({name, responsable: roll, fase: phase});
            await processR.save(process);
            return process;
        } catch (error) {
            return 1;
        }
    }

    async updateProcess(data: Partial<processData>, id: number, user: User): Promise<Number | Process> {
        try {
            const {participantList, evidenceEntries, evidenceOutputs} = data;
            const userRepo = database.getRepository(User);
            const pdfRepo = database.getRepository(PDF);
            let users: User[] = [];
            const processRepo = database.getRepository(Process);
            const process = await processRepo.findOne({where: {id}});
            if (participantList){
                users = await Promise.all(participantList.map(index => userRepo.findOneBy({id: index})));
                process.participants = users;
                await processRepo.save(process);
            }
            if (evidenceEntries.length > 0){
                process.evidencia_entrada = evidenceEntries;
                await processRepo.save(process);
            }
            if (evidenceOutputs.length > 0){
                process.evidencia_salida = evidenceOutputs;
                await processRepo.save(process);
            }
            delete data.participantList;
            delete data.evidenceEntries;
            delete data.evidenceOutputs;
            await processRepo.update({id}, {...data, last_editor: user});
            const process2 = await processRepo.findOne({where: {id}, relations:{last_editor: true}});
            const url = create(process2);
            let pdf = await pdfRepo.findOne({where: {nombre: process2.name.replace(' ','')}});
            if (!pdf){
                pdf = pdfRepo.create({
                    nombre: process2.name.replace(' ',''),
                    path: ""+url,
                    url: "http://localhost:8000/files/"+url
                });
                pdfRepo.save(pdf);
                process2.pdf = pdf;
                processRepo.save(process2);
            }
            return process2;
        } catch (error) {
            console.log(error);
            return 1;
        }
    }

    async deleteProcess(id: number): Promise<Number> {
        try {
            const processRepo = database.getRepository(Process);
            await processRepo.delete({id});
            return 0;
        } catch (error) {
            return 1;
        }
    }
    
    async showProcesses(): Promise<Number | Process[]> {
        const processRepo = database.getRepository(Process);
        const process = processRepo.find();
        return process;
    }

    async showByPhase(fase_id: number): Promise<Number | Process[]> {
        const processRepo = database.getRepository(Process);
        const faseRepo = database.getRepository(Phase);
        const fase = await faseRepo.findOne({where:{id: fase_id}});
        const processes =  await processRepo.find({where: {fase:fase}, relations: ['fase']});
        return processes;
    }

    async showByRoll(rol_id: number): Promise<Process[]>{
        const rolRepo = database.getRepository(Roll);
        const roll = await rolRepo.findOne({where: {id: rol_id}, relations: {processes: true}});
        return roll.processes;
    }

    async showById(id: number): Promise<Number | Process> {
        const processRepo = database.getRepository(Process);
        const process = await processRepo.findOneBy({id});
        return process;
    }

    static async getByName(name:string){
        const processR = database.getRepository(Process);
        const process = await processR.findOne({where: {name}});
        return process;
    }
}