import {db} from '../server/db.client';
import {Autos} from "../db/schema";
import {desc} from "drizzle-orm";

export class AutosQuery {
    public static async getAll() {
        return db.select().from(Autos).limit(10).orderBy(desc(Autos.CreationDate))
    }
}