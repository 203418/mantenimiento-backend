import { Request, Response } from "express";
import { userRepository } from "../../declarations";
import { generateJWT } from "../../helpers/middlewares/generateJWT";
import User from "./users.model";

export default class UserController {
    constructor(private readonly repository: userRepository<User>){}
    async count(req: Request, res: Response) {
        const nUser = await this.repository.countUsers();
        let resp = 0;
        if (nUser === 0)
            return res.status(200).json({
                count: -1
            });
        return res.status(200).json({
            count: nUser
        });
    }
    async register(req: Request, res: Response) {
        const {name, last_name, rolls, username, password} = req.body;
        const user = await this.repository.register({name, last_name, rolls, username, password});
        if (typeof user === 'object'){
            const token = await generateJWT( ""+user.id );
            return res.status(201).json({...user, token});
        }
        else
            return res.status(400).json({ message: "Error al guardar el usuario" })
    }
}