import {db} from '../server/db.client';
import {Goods} from "../db/schema";
import {eq} from "drizzle-orm";
import {takeMaybeUniqueOrThrow} from "../take/take-unique";

export class GoodQuery {
    public static async getAll() {
        return []
    }

    public static async getByIdAuction(auctionId: number) {
        const query = await db.select().from(Goods).where(eq(Goods.AutoId, auctionId))
        return takeMaybeUniqueOrThrow(query, `Not unique result in Good with Auction Id (${auctionId})`)
    }
}