import { Repository } from "typeorm";
import database from "../../bootstrap/database";
import { PhaseData, phaseRepository } from "../../declarations";
import Phase from "./phases.model";

export default class PhaseRepository implements phaseRepository<Phase> {
    constructor(private readonly phaseRepo: Repository<Phase> = database.getRepository(Phase)){}
    async getById(id: number): Promise<Phase | Number>{
        try {
            const phase = await this.phaseRepo.findOneBy({id});
            if (phase)
                return phase;
            else return 2;
        } catch (error) {
            return 1;
        }
    }
    async readPhases(): Promise<Number | Phase[]> {
        try {
            const phases = await this.phaseRepo.find();
            if (phases.length > 0)
                return phases;
            else return 2;
        } catch (error) {
            return 1;
        }
    }
    async deletePhase(id: number): Promise<Number> {
        try {
            const phase = await this.phaseRepo.findOneBy({id});
            if (phase){
                await this.phaseRepo.delete(phase.id);
                return 1;
            }else {
                return 2;
            }
        } catch (error) {
            return 0;
        }

    }
    async updatePhase(phaseData: PhaseData, id: number): Promise<Number | Phase> {
        const {numero_procesos, nombre, descripcion, objetivo }: PhaseData = phaseData;
        if (numero_procesos)
            delete phaseData.numero_procesos;
        try{
            const phase = await this.phaseRepo.findOneBy({id});
            if (phase){
                if (nombre)
                    phase.nombre = nombre;
                if (descripcion)
                    phase.descripcion = descripcion;
                if (objetivo)
                    phase.objetivo = objetivo;
                await this.phaseRepo.save(phase);
                return phase;
            }else return 2;
        }catch(error){
            console.log(error);
            return 1;
        }
    }
    async registerPhase(phaseData: PhaseData): Promise<Phase | Number> {
        try {
            const {numero_procesos, }: PhaseData = phaseData;
            if (numero_procesos)
                delete phaseData.numero_procesos;
            
            const phase = this.phaseRepo.create({...phaseData});
            await this.phaseRepo.save(phase);
            return phase;
        } catch (error) {
            return 1;
        }
    }
    
    async getPhaseName(nombre: string): Promise<Phase>{
        return await this.phaseRepo.findOneBy({ nombre });        
    }
    
}