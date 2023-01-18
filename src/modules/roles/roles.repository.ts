import { roll, rollRepository } from "../../declarations";
import Roll from "./roles.model";
import database from "../../bootstrap/database";

const rolls: roll[] = [
    "MANAGER", "QUALITY MANAGER", "SCRUM MASTER", "SOFTWARE ARCHITECT",
    "REQUIREMENTS", "DEVELOPER", "DESIGNER", "PRODUCT OWNER"
]

export default class RollRepository implements rollRepository<Roll>{
    static async getNRolls(): Promise<number> {
        const rollRepository = database.getRepository(Roll);
        return await rollRepository.count();
    }
    async registerRolls(): Promise<number> {
        try {
            await Promise.all(rolls.map(async (r) => {
                const rollRepository = database.getRepository(Roll);
                const roll = rollRepository.create({name: r});
                await rollRepository.save(roll);
            }));
            return 0;
        } catch (error) {
            console.log(error);
            return 1;
        }
    }
    async registerRoll(roll: roll): Promise<Roll | number> {
        try {
            const rollRepository = database.getRepository(Roll);
            const rollCreate = rollRepository.create({ name: roll });
            await rollRepository.save(rollCreate);
            return rollCreate;
        } catch (error) {
            return 1;
        }
    }
}