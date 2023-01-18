import { Request, Response } from "express";
import { generateJWT } from "../../helpers/middlewares/generateJWT";
import User from "../users/users.model";
import UserRepository from "../users/users.repository";

export default class AuthController {

    constructor(private readonly userRepository: UserRepository){}

    async login(req: Request, res:Response) {
        const { username, password } = req.body;
        const user = await this.userRepository.login({username, password});
        if (typeof user === "object"){
            console.log(typeof user);const token = await generateJWT( ""+user.id );
            return res.status(200).json({...user, token});
        }
        if (user == 1.1){
            return res.status(401).json({
                message: 'Nombre de usuario incorrecto'
            })
        }

        if (user == 1.2){
            return res.status(401).json({
                message: 'Contraseña de usuario incorrecta'
            })
        }
    }
}