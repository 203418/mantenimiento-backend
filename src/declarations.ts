import { Query } from "typeorm/driver/Query";
import Phase from "./modules/phases/phases.model";
import Process from "./modules/process/process.model";
import Roll from "./modules/roles/roles.model";
import User from "./modules/users/users.model";

export interface paths {
    rolls: string;
    users: string;
    process: string;
    phases: string;
}

export type roll = "MANAGER" | "QUALITY MANAGER" | 
    "SCRUM MASTER" | "SOFTWARE ARCHITECT" | "REQUIREMENTS" | 
    "DEVELOPER" | "TESTER" | "DESIGNER" | "PRODUCT OWNER";

export interface userRepository<T> {
    register(data: userData, query?: Query): Promise<T | number>;
    login(loginData: loginData): Promise<User | number>;
    countUsers(): Promise<Number>;
    getUsers(id: number): Promise<User[]>;
}

export interface processRepository<T> {
    registerProcess(data: processData): Promise<Process | Number>;
}

export interface rollRepository<T> {
    registerRolls(): Promise<number>;
    registerRoll(roll:roll): Promise<Roll | number>;
    getRolls(): Promise<Roll[]>;
}

export interface phaseRepository<T> {
    registerPhase(phaseData: PhaseData): Promise<Phase | Number>;
    updatePhase(phaseData: PhaseData, id: number): Promise<Phase | Number>;
    deletePhase(id: number): Promise<Number>;
    readPhases(): Promise<Phase[] | Number>;
    getById(id: number): Promise<Phase | Number>;
}

export interface PhaseData {
    nombre: string;
    numero_procesos?: number;
    descripcion: string;
    objetivo: string;
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
    fase: number;
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