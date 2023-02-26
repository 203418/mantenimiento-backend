import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm"
import Process from "./process.model";

@Entity("pdfs")
export default class PDF {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    nombre:string;

    @Column("text")
    path: string;

    @Column("text")
    url: string;

    @OneToOne(() => Process, (process: Process) => process.pdf, {nullable: true})
    @JoinColumn()
    process: Process;
}