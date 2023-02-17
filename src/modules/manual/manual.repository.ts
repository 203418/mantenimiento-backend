import database from "../../bootstrap/database";
import { manualData, manualRepository } from "../../declarations";
import User from "../users/users.model";
import Manual from "./manual.model";

export default class ManualRepository implements manualRepository<Manual> {
    async registerManual(data: manualData): Promise<Manual | number> {
        try {
            const repository = database.getRepository(Manual);
            //const userR = database.getRepository(User);
            //console.log(data.idR);
            //const user = await userR.findOne({where: {id: data.idR}})
            const manual = repository.create({...data});
            await repository.save(manual);
            return manual;
        } catch (error) {
            return 1;
        }
    }
}