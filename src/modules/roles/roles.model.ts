import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { roll } from "../../declarations";
import User from "../users/users.model";

@Entity("rolls")
export default class Roll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: roll

    @ManyToMany(() => User, (user: User) => user.rolls)
    users: User[]

    @CreateDateColumn()
    createAt: Date;
}