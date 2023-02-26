import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Process from "../process/process.model";


@Entity('phases')
export default class Phase {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text")
    nombre: string;

    @Column("int", {default: 0})
    numero_procesos: number;

    @Column("text")
    descripcion: string;

    @Column("text")
    objetivo: string;

    @OneToMany(() => Process, (process: Process) => process.fase)
    processes: Process[];
}