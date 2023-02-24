import { Query } from "typeorm/driver/Query";
import database from "../../bootstrap/database";
import { loginData, roll, userData, userRepository } from "../../declarations";
import bcryptjs from 'bcryptjs';
import Roll from "../roles/roles.model";
import Credential from "./credentials.model";
import User from "./users.model";
import { Not, Repository } from "typeorm";
import { response } from "express";

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

    async getUsers(id: number): Promise<User[]> {
        const users = await this.userRepository.find({where: {id: Not(id)}})
        if (users.length > 0) return users;
        else return [];
    }

    async login(loginData: loginData): Promise<User | number> {
        const credentialsRepository = database.getRepository(Credential)
        const { username, password } = loginData;
        const credentials = await credentialsRepository.findOneBy({username });
    
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

    async deleteUser(id: number): Promise<void>{
        try{
            const userCredentials = database.getRepository(Credential);
            const credentials = await userCredentials.delete(id);
            const user = await this.userRepository.delete(id);
        }catch(error){
            console.log(error)
        }   
    }

    async updateUser(id: number, data: Partial<userData>) {
        const user = await this.userRepository.findOneBy({id : id});
        const response = {
            noUpdate: "Error al actualizar el usuario", 
            noFound : "Usuario ya existente", 
            success : "Usuario actualizado"      
        }

        if(user){
            const userCredentials = database.getRepository(Credential);
            const credentials = await userCredentials.findOne({ where: { id: id }});
            //const {name, last_name, rolls, username, password} 
            if (data.name) {
                user.name = data.name;
            }
            if (data.last_name) {
                user.last_name = data.last_name;
            }
            if (data.rolls){
                const rollRepository = database.getRepository(Roll);

                    const rolls = await Promise.all(data.rolls.map(async (r) => {
                        const roll = await rollRepository.findOne({ where: { name: r} });
                        if (roll) {
                          return roll;
                        }
                    })).then((result) => result.filter((roll) => roll !== undefined));
                    
                      user.rolls = rolls;
            }
            if (data.password){
                const salt = bcryptjs.genSaltSync();
                const validPassword = bcryptjs.hashSync(data.password, salt);
                credentials.password = validPassword
                //const updatedCredentials = userCredentials ? userCredentials : (userCredentials.update(id, { password: validPassword, user}));
            }
            if (data.username){
                const newUSername = await userCredentials.findOne({ where: { username: data.username} });
                console.log(newUSername)
                if(!newUSername){
                    credentials.username = data.username;
                }else{
                    return response.noFound
                }
                //const updatedCredentials = userCredentials ? userCredentials : (userCredentials.update(id, { username: data.username, user}));
            }
            await userCredentials.save(credentials);
            await this.userRepository.save(user);

            return response.success
            
            //const newUser = userCredentials.create();
        }else{
            return response.noUpdate
        }
      }
}

