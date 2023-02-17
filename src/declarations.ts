import { Query } from "typeorm/driver/Query";
import Process from "./modules/process/process.model";
import Roll from "./modules/roles/roles.model";
import User from "./modules/users/users.model";

export interface paths {
    rolls: string;
    users: string;
    process: string;
}

export type roll = "MANAGER" | "QUALITY MANAGER" | 
    "SCRUM MASTER" | "SOFTWARE ARCHITECT" | "REQUIREMENTS" | 
    "DEVELOPER" | "TESTER" | "DESIGNER" | "PRODUCT OWNER";

export interface userRepository<T> {
    register(data: userData, query?: Query): Promise<T | number>;
    login(loginData: loginData): Promise<User | number>;
    countUsers(): Promise<Number>;
    getUsers(id: number): Promise<User[]>;
    deleteUser(id: number) : Promise<void>;
    updateUser(id: number) : Promise<void>;
}

export interface processRepository<T> {
    registerProcess(data: processData): Promise<Process | Number>;
}

export interface rollRepository<T> {
    registerRolls(): Promise<number>;
    registerRoll(roll:roll): Promise<Roll | number>;
    getRolls(): Promise<Roll[]>;
}

export interface processData {
    name: string;
    object: string;
    identifier: string
    indicators: string;
    flujo_digram: string;
    participantes: string;
    evidencia_entrada: string;
    evidencia_salida: string;
    frecuencia: string;
    fase: string;
    idR: number;
}

export interface rollData {
    name: string;
}

export interface loginData {
    username: string;
    password: string;
}

export interface userData {
    name: string;
    last_name: string;
    rolls: roll[];
    username: string;
    password: string;
}