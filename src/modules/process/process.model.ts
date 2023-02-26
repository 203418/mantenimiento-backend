import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ManyToMany } from "typeorm/decorator/relations/ManyToMany";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import Phase from "../phases/phases.model";
import Roll from "../roles/roles.model";
import User from "../users/users.model";
import Evidence from "./evidencia.model";
import PDF from "./pdf.model";

@Entity('process')
export default class Process {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text', {nullable: true})
    object: string;

    @Column('text', {nullable: true})
    identifier: string

    @Column('text', {nullable: true})
    indicators: string;

    @Column('text', {nullable: true})
    description: string;

    @Column('text', {nullable: true})
    flujo_digram: string;

    @ManyToOne(() => Roll, (roll: Roll) => roll.processes, {cascade: true, eager: true})
    @JoinColumn()
    responsable: Roll;

    @ManyToOne(() => User, (user: User) => user.processes_edited, {nullable: true})
    @JoinColumn()
    last_editor: User;

    @ManyToMany(() => User, (user: User) => user.processes_involucrated)
    @JoinTable({
        name: 'processes_participants',
        joinColumn: { name: 'process_id' },
        inverseJoinColumn: {name: 'user_id'}
    })
    participants: User[];

    @ManyToMany(() => Evidence, (evidency: Evidence) => evidency.processEntry, {eager: true})
    @JoinTable({
        name: 'processes_evidence_entries',
        joinColumn: {name: 'process_id'},
        inverseJoinColumn: {name: 'evidency_id'}
    })
    evidencia_entrada: Evidence[];

    @ManyToMany(()=>Evidence, (evidency: Evidence) => evidency.processOutput, {eager: true})
    @JoinTable({
        name: 'processes_evidence_outputs',
        joinColumn: {name: 'process_id'},
        inverseJoinColumn: {name: 'evidency_id'}
    })
    evidencia_salida: Evidence[];

    @Column('text', {nullable: true})
    frecuencia: string;

    @ManyToOne(() => Phase, (phase: Phase) => phase.processes, {cascade: true, eager:true})
    @JoinColumn()
    fase: Phase;

    @OneToOne(() => PDF, (pdf: PDF) => pdf.process, {cascade: true, eager: true})
    pdf: PDF;
}