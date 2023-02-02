import database from "../../bootstrap/database";
import { processData, processRepository } from "../../declarations";
import User from "../users/users.model";
import Process from "./process.model";

export default class ProcessRepository implements processRepository<Process> {
    async registerProcess(data: processData): Promise<Process | number> {
        try {
            const repository = database.getRepository(Process);
            const userR = database.getRepository(User);
            console.log(data.idR);
            const user = await userR.findOne({where: {id: data.idR}})
            const process = repository.create({...data, responsable: user});
            await repository.save(process);
            return process;
        } catch (error) {
            return 1;
        }
    }
}