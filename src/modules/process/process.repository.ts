import database from "../../bootstrap/database";
import { processData, processRepository } from "../../declarations";
import Phase from "../phases/phases.model";
import User from "../users/users.model";
import Process from "./process.model";

export default class ProcessRepository implements processRepository<Process> {
    async registerProcess(data: processData): Promise<Process | number> {
        const {fase} = data;
        delete data.fase;
        try {
            const repository = database.getRepository(Process);
            const userR = database.getRepository(User);
            const phaseR = database.getRepository(Phase);
            const phase = await phaseR.findOne({where: {id: fase}})
            phase.numero_procesos += 1;
            await phaseR.save(phase);
            const user = await userR.findOne({where: {id: data.idR}})
            const process = repository.create({...data, responsable: user, fase: phase});
            await repository.save(process);
            return process;
        } catch (error) {
            return 1;
        }
    }
}