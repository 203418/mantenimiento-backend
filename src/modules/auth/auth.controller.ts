import { Request, Response } from "express";
import { generateJWT } from "../../helpers/middlewares/generateJWT";
import { verifyJWT } from "../../helpers/middlewares/verifyJWT";
import User from "../users/users.model";
import UserRepository from "../users/users.repository";

export default class AuthController {

    constructor(private readonly userRepository: UserRepository){}

    
    async getUserByToken(req: Request, res: Response) {
        const token: string = req.body.token;
        const user = await verifyJWT(token);
        if (!user)
            return res.status(401).json({
                user: null
            });
        return res.status(200).json({
            user: {...user, token}
        });
    }

    async login(req: Request, res:Response) {
        const { username, password } = req.body;
        const user = await this.userRepository.login({username, password});
        if (typeof user === "object"){
            const token = await generateJWT( ""+user.id );
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