import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ManyToMany } from "typeorm/decorator/relations/ManyToMany";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import User from "../users/users.model";
import Manual from "../manual/manual.model";

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

    @Column({ type: 'text', nullable: true })
    flujo_digramS: string;

    @Column({ type: 'bytea', nullable: true })
    flujo_digramI: Buffer;

    @ManyToOne(() => User, (user: User) => user.processes)
    responsable: User;

    @Column('text')
    participantes: string;

    @Column({ type: 'text', nullable: true })
    evidencia_entradaS: string;

    @Column({ type: 'bytea', nullable: true })
    evidencia_entradaI: Buffer;

    @Column({ type: 'text', nullable: true })
    evidencia_salidaS: string;

    @Column({ type: 'bytea', nullable: true })
    evidencia_salidaI: Buffer;

    @Column('text')
    frecuencia: string;

    @Column('text')
    fase: string;

    @OneToOne(() => User, (user: User) => user.name, {eager: true})
    @JoinColumn()
    last_edited: User;

    @OneToOne(() => Manual, (manual: Manual) => manual.pdf, {eager: true})
    @JoinColumn()
    pdf: Manual;
}