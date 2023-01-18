import jwt from 'jsonwebtoken';


export const generateJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1d'
        }, ( err, token ) => {
            if( err ){
                console.log(err);
                reject('No se pudo general el token');
            }else{
                resolve( token );
            }
        });
    });
}