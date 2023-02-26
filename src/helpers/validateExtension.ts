import { UploadedFile } from 'express-fileupload';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import evidencedata from '../declarations';

export const uploadArchive = (file: UploadedFile, folder: string, extensionesValidas = ['png','jpg','jpeg','gif','pdf']) => {

    return new Promise(( resolve, reject ) =>{
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];
        const temporalName = `${uuidv4()}.${extension}`;
        if(!extensionesValidas.includes( extension )){
            return reject(`La extensión ${extension} no es permitida, ${extensionesValidas}`);
        }
        const uploadPath = path.join(__dirname, '../../uploads/',folder, temporalName);
        file.mv(uploadPath, function(err) {
            if (err) {
                return reject(undefined);
            }
            const data: evidencedata = {
                nombre: temporalName, nombreOriginal: file.name,
                url: ""+process.env.url_dev+uploadPath,
                ruta: uploadPath
            }
            return resolve(data);
        });
    });
}