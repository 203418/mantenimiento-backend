import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { roll } from "../../declarations";
import Process from "../process/process.model";
import User from "../users/users.model";

@Entity("rolls")
export default class Roll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: roll

    @ManyToMany(() => User, (user: User) => user.rolls)
    users: User[]

    @OneToMany(()=> Process, (process: Process) => process.responsable)
    processes: Process[]

    @CreateDateColumn()
    createAt: Date;
}