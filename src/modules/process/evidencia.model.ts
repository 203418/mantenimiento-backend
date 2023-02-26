import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Process from "./process.model";


@Entity('evidencies')
export default class Evidence {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nombre: string;

    @Column("text", {nullable: true})
    nombreOriginal: string
    
    @Column("text", {nullable: true})
    url: string;

    @Column("text", {nullable: true})
    ruta: string;

    @Column("boolean", {default: false})
    isFull: boolean;

    @ManyToMany(() => Process, (process: Process) => process.evidencia_entrada)
    processEntry: Process[]

    @ManyToMany(()=>Process, (process: Process) => process.evidencia_salida)
    processOutput: Process[]
}