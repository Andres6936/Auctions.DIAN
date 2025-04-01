import {db} from '../server/db.client';
import {Goods} from "../db/schema";
import {eq} from "drizzle-orm";

export class GoodQuery {
    public static async getAll() {
        return []
    }

    public static async getByIdAuction(auctionId: number) {
        return db.select().from(Goods).where(eq(Goods.AutoId, auctionId))
    }
}