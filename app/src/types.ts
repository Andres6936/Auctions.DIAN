import {AutosQuery} from "schemas";

export type BaseResponse<Code, Body> = {
    statusCode: Code;
    body: Body;
}

export type GETAuctionAll = BaseResponse<200, {
    Items: Awaited<ReturnType<typeof AutosQuery.getAll>>,
    Page: number,
    PageSize: number,
}>;