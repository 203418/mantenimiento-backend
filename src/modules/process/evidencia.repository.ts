import path from "path";
import evidencedata, { evidenceRepository } from "../../declarations";
import { UploadedFile } from "express-fileupload";
import Evidence from "./evidencia.model";
import { uploadArchive } from "../../helpers/validateExtension";
import database from "../../bootstrap/database";


export default class EvidencyRepository implements evidenceRepository<Evidence> {
    createEvidence(files: UploadedFile[], folder: string): Promise<Evidence[]> {
        const evidences = Promise.all(files.map(async(file) => {
            const evidenceR = database.getRepository(Evidence);
            let evidence: Evidence = await evidenceR.findOneBy({nombreOriginal: file.name});
            console.log(evidence);
            if (!evidence){
                const path: any = await uploadArchive(file, folder);
                evidence = evidenceR.create({
                    nombre: path.nombre, nombreOriginal: path.nombreOriginal,
                    url: path.url, ruta: path.ruta, isFull: true
                });
                await evidenceR.save(evidence);
            }
            return evidence;
        }));
        return evidences;
    }
}