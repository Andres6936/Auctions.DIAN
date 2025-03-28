import {serve} from "bun";
import index from "./index.html";
import {db} from "@/server/client/db.client";
import {Autos} from "schemas";

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
                const query = await db.select().from(Autos).limit(10);
                return Response.json({
                    body: query
                })
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
