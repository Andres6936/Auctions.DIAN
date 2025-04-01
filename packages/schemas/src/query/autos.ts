import {db} from '../server/db.client';
import {Autos} from "../db/schema";
import {desc, eq} from "drizzle-orm";
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from "../defaults/const.ts";

export class AutosQuery {
    public static async getAll(page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) {
        const subQuery = db.select({Id: Autos.IdAuto})
            .from(Autos)
            .orderBy(desc(Autos.CreationDate), desc(Autos.IdAuto))
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .as('SubQuery')

        return db.select()
            .from(Autos)
            .innerJoin(subQuery, eq(Autos.IdAuto, subQuery.Id))
            .orderBy(desc(Autos.CreationDate))
    }
}