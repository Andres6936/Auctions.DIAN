import {Autos, Goods, GoodsImages} from "schemas";

export type BaseResponse<Code, Body> = {
    statusCode: Code;
    body: Body;
}

export type AuctionModel = typeof Autos.$inferSelect & {
    Good: typeof Goods.$inferSelect | null,
    Images: typeof GoodsImages.$inferSelect[],
}

export type GETAuctionAll = BaseResponse<200, {
    Items: AuctionModel[],
    Page: number,
    PageSize: number,
}>;