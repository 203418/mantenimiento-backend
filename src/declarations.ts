import { UploadedFile } from "express-fileupload";
import { Query } from "typeorm/driver/Query";
import Phase from "./modules/phases/phases.model";
import Evidence from "./modules/process/evidencia.model";
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
    registerProcess(data: processCreate): Promise<Process | Number>;
    updateProcess(data: Partial<processData>, id: number, user: User): Promise<Process | Number>;
    deleteProcess(id: number): Promise<Number | Process>;
    showProcesses(): Promise<Process[] | Number>;
    showByPhase(fase_id: number): Promise<Process[] | Number>;
    showById(id: number): Promise<Process | Number>;
}

export interface rollRepository<T> {
    registerRolls(): Promise<number>;
    registerRoll(roll:roll): Promise<Roll | number>;
    getRolls(): Promise<Roll[]>;
}

export interface phaseRepository<T> {
    registerPhase(phaseData: PhaseData): Promise<Phase | Number>;
    updatePhase(phaseData: PhaseData, id: number): Promise<Phase | Number>;
    deletePhase(id: number): Promise<Number | Phase>;
    readPhases(): Promise<Phase[] | Number>;
    getById(id: number): Promise<Phase | Number>;
}

export interface evidenceRepository<T> {
    createEvidences(files: UploadedFile[], folder: string): Promise<Evidence[]>;
}

export interface evidenceUrl {
    nombre: string;
    url: string;
}

export interface evidencedata {
    nombre: string;
    nombreOriginal: string;
    url: string;
    ruta: string;
}

export interface PhaseData {
    nombre: string;
    numero_procesos?: number;
    descripcion: string;
    objetivo: string;
}

export interface processCreate {
    name: string;
    responsable_id: number;
    phase_id: number;
}

export interface processData {
    name: string;
    object: string;
    identifier: string
    indicators: string;
    flujo_digram: string;
    frecuencia: string;
    participantList: number[];
    evidenceEntries: Evidence[];
    evidenceOutputs: Evidence[];
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