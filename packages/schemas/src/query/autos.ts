import {db} from '../server/db.client';
import {Autos} from "../db/schema";

export class AutosQuery {
    public static async getAll() {
        return db.select().from(Autos).limit(10)
    }
}