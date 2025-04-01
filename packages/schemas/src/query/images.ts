import {db} from "../server/db.client";
import {GoodsImages} from "../db/schema";
import {eq} from "drizzle-orm";

export class ImagesQuery {
    public static async getByIdGood(goodId: number) {
        return db.select().from(GoodsImages).where(eq(GoodsImages.GoodId, goodId))
    }
}