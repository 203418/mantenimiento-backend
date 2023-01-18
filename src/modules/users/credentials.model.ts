import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./users.model";

@Entity("credentials")
export default class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    username: string;

    @Column("text")
    password: string;

    @OneToOne(() => User, (user: User) => user.credentials, {eager: true})
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createAt: Date;
}