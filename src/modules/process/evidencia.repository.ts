import path from "path";
import { evidenceRepository, evidencedata, evidenceUrl } from "../../declarations";
import { UploadedFile } from "express-fileupload";
import Evidence from "./evidencia.model";
import { uploadArchive } from "../../helpers/validateExtension";
import database from "../../bootstrap/database";
import {v4 as uuid} from "uuid";

export default class EvidencyRepository implements evidenceRepository<Evidence> {
    createEvidences(files: UploadedFile[], folder: string): Promise<Evidence[]> {
        const evidences = Promise.all(files.map(async(file) => {
            const evidenceR = database.getRepository(Evidence);
            let evidence: Evidence = await evidenceR.findOneBy({nombreOriginal: file.name});
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

    async createEvidence(file: UploadedFile, folder: string): Promise<Evidence> {
        const evidenceR = database.getRepository(Evidence);
        let evidence: Evidence = await evidenceR.findOneBy({nombreOriginal:file.name});
        if (!evidence){
            const path: any = await uploadArchive(file, folder);
            evidence = evidenceR.create({
                nombre: path.nombre, nombreOriginal: path.nombreOriginal,
                url: path.url, ruta: path.ruta, isFull: true
            });
            await evidenceR.save(evidence);
            return evidence
        }
        return evidence;
    }
    static async createUrlE(evidence: string): Promise<Evidence> {
        const evidenceR = database.getRepository(Evidence);
        const evidenceF = evidenceR.create({nombre: uuid(), url: evidence});
        await evidenceR.save(evidenceF);
        return evidenceF;
    }
}