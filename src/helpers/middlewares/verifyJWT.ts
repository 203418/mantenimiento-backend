import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken"
import UserRepository from "../../modules/users/users.repository";


export const validateJWT = async( req: Request, res: Response, next: NextFunction ) => {
    const authorization = req.header('Authorization');
    
    const token = authorization ? authorization.split(' ')[1] : false;

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try{
        const jwtV = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (typeof jwtV === 'object'){
            const uid = jwtV.uid;
            const user = await UserRepository.getUser(Number(uid));
            
            if(!user){
                return res.status(401).json({
                    msg:'Token no valido - usuario no existente en DB'
                });
            }
            req.body.user = user;
        }
        next();
    }catch(err){
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

}