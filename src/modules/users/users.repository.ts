import { Query } from "typeorm/driver/Query";
import database from "../../bootstrap/database";
import { loginData, roll, userData, userRepository } from "../../declarations";
import bcryptjs from 'bcryptjs';
import Roll from "../roles/roles.model";
import Credential from "./credentials.model";
import User from "./users.model";
import { Repository } from "typeorm";

export default class UserRepository implements userRepository<User>{
    private userRepository: Repository<User>;
    static userRepository = database.getRepository(User);
    constructor(){
        this.userRepository = database.getRepository(User);
    }
    static async getNUsers(): Promise<number> {
        return await this.userRepository.count();
    }

    static async getUser(id: number): Promise<User> {
        return await this.userRepository.findOneBy({id});
    }

    static async getCredentials(username: string): Promise<Credential> {
        const credentialRepository = database.getRepository(Credential);
        return await credentialRepository.findOneBy({ username });
    }

    async login(loginData: loginData): Promise<User | number> {
        const credentialsRepository = database.getRepository(Credential)
        const { username, password } = loginData;
        const credentials = await credentialsRepository.findOneBy({ username });
        if (!credentials) return 1.1;
        const validPassword = bcryptjs.compareSync(password, credentials.password);
        if (!validPassword)return 1.2;
        return credentials.user;
    }

    async register(data: userData, query?: Query): Promise<User | number> {
        try {
            const userCredentials = database.getRepository(Credential);
            const salt = bcryptjs.genSaltSync();
            const validPassword = bcryptjs.hashSync(data.password, salt);
            const user = this.userRepository.create({ name: data.name, last_name: data.last_name });
            await this.userRepository.save(user);
            const credentials = userCredentials.create({ username: data.username, password: validPassword, user });
            await userCredentials.save(credentials);
            const rolls = await Promise.all(data.rolls.map(async (r) => {
                const rollRepository = database.getRepository(Roll);
                const roll = await rollRepository.findOneBy({ name: r });
                if (roll){
                    return roll;
                }
            }));
            user.credentials = credentials;
            user.rolls = rolls;
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.log(error); 
            return 1;
        }
    }
    async countUsers(): Promise<Number> {
        const number = await this.userRepository.count();
        return number;
    }
}