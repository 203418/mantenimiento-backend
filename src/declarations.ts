import { Query } from "typeorm/driver/Query";
import Roll from "./modules/roles/roles.model";
import User from "./modules/users/users.model";

export interface paths {
    rolls: string;
    users: string;
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

export interface rollRepository<T> {
    registerRolls(): Promise<number>;
    registerRoll(roll:roll): Promise<Roll | number>;
    getRolls(): Promise<Roll[]>;
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