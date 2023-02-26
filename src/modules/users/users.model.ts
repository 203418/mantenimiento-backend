import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import Process from "../process/process.model";
import Roll from "../roles/roles.model";
import Credential from "./credentials.model";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;
    
    @Column("text")
    last_name: string;

    @OneToOne(() => Credential, (credential: Credential) => credential.user, {cascade: true})
    credentials: Credential

    @OneToMany(() => Process, (process: Process) => process.last_editor, {cascade: true, eager: true})
    processes_edited: Process[];

    @ManyToMany(() => Roll, (roll: Roll) => roll.users, {cascade: true, eager: true})
    @JoinTable({
        name: 'users_rolls',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: {name: 'roll_id'}
    })
    rolls: Roll[]

    @ManyToMany(() => Process, (process: Process) => process.participants, {cascade: true, eager: true})
    processes_involucrated: Process[];


    @CreateDateColumn()
    createAt: Date;
}