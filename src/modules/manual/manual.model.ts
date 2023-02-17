import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/users.model";
import Process from "../process/process.model";

@Entity('manual')
export default class Manual{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('bytea')
    pdf: Buffer;

    @OneToOne(() => Process, (process: Process) => process.pdf, {cascade: true})
    process: Process;
}