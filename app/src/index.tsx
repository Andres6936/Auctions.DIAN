import {serve} from "bun";
import index from "./index.html";
import {AutosQuery, GoodQuery} from "schemas";
import type {AuctionModel, GETAuctionAll} from '@/types'

const server = serve({
    routes: {
        // Serve index.html for all unmatched routes.
        "/*": index,

        "/api/hello": {
            async GET(req) {
                return Response.json({
                    message: "Hello, world!",
                    method: "GET",
                });
            },
            async PUT(req) {
                return Response.json({
                    message: "Hello, world!",
                    method: "PUT",
                });
            },
        },

        "/api/hello/:name": async (req) => {
            const name = req.params.name;
            return Response.json({
                message: `Hello, ${name}!`,
            });
        },

        "/api/auctions/all": {
            async GET() {
                const items: AuctionModel[] = [];
                const auctions = await AutosQuery.getAll();
                for (const auction of auctions) {
                    items.push({
                        ...auction,
                        Good: await GoodQuery.getByIdAuction(auction.IdAuto)
                    })
                }

                return Response.json({
                    statusCode: 200,
                    body: {
                        Items: items,
                        Page: 1,
                        PageSize: 10,
                    }
                } satisfies GETAuctionAll)
            },

            async POST(req) {
                return Response.json({
                    body: ['Hello', 'World', '!']
                })
            }
        },
    },

    development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
