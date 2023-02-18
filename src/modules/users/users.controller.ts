import { Request, response, Response } from "express";
import { userRepository } from "../../declarations";
import { generateJWT } from "../../helpers/middlewares/generateJWT";
import User from "./users.model";

export default class UserController {
    constructor(private readonly repository: userRepository<User>){}

    async getUsersDifferentOfId(req: Request, res: Response) {
        const id = req.params.id;
        const users = await this.repository.getUsers(Number(id));
        if (users.length <= 0) {
            return res.status(400).json({
                msg: 'No hay usuarios aparte de este',
            });
        }
        return res.status(200).json(users)
    }

    async count(req: Request, res: Response) {
        console.log(1);
        const nUser = await this.repository.countUsers();
        console.log(2);
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
        console.log(rolls)
        const user = await this.repository.register({name, last_name, rolls, username, password});
        if (typeof user === 'object'){
            const token = await generateJWT(""+user.id );
            return res.status(201).json({...user, token});
        }
        else
            return res.status(400).json({ message: "Error al guardar el usuario" })
    }

    async deleteUserOfId(req: Request, res: Response){
        const id = req.body.id;
        
        try{
            await this.repository.deleteUser(id);

            return res.status(200).json({message: "El usuario ha sido eliminado" })
        }catch(error){
            return res.status(400).json({message: error})
        }
        
    }

    async updateUserOfId(req: Request, res: Response){
        const id = req.body.id;
        const data = req.body
        try{   
            await this.repository.updateUser(id, data)
            return res.status(200).json({message: "Usuario actualizado"})
        }catch(error){
            return res.status(200).json({message: "Error al actualizar"})
        }
    }
}