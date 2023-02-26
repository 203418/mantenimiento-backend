import { DataSource } from "typeorm";
import 'dotenv/config';
import Roll from "../modules/roles/roles.model";
import User from "../modules/users/users.model";
import Credential from "../modules/users/credentials.model";
import Process from "../modules/process/process.model";
import Phase from "../modules/phases/phases.model";
import Evidence from "../modules/process/evidencia.model";
import PDF from "../modules/process/pdf.model";

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Roll, User, Credential, Process, Phase, Evidence, PDF],
    synchronize: true,
    logging: false,
});