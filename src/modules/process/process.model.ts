import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ManyToMany } from "typeorm/decorator/relations/ManyToMany";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import User from "../users/users.model";

@Entity('process')
export default class Process {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    object: string;

    @Column('text')
    identifier: string

    @Column('text')
    indicators: string;

    @Column('text')
    flujo_digram: string;

    @ManyToOne(() => User, (user: User) => user.processes)
    responsable: User;

    @Column('text')
    participantes: string;

    @Column('text')
    evidencia_entrada: string;

    @Column('text')
    evidencia_salida: string;

    @Column('text')
    frecuencia: string;

    @Column('text')
    fase: string;
}