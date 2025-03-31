import {serve} from "bun";
import index from "./index.html";
import {AutosQuery} from "schemas";

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
                const query = await AutosQuery.getAll();
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
