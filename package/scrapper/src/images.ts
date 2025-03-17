import {Database} from "bun:sqlite";
import {drizzle} from "drizzle-orm/bun-sqlite";
import {getToken, getTokenSystem, useQuery} from "./login.ts";
import sharp from "sharp";
import {S3Client} from "bun";
import {GoodsImages} from "./db/schema.ts";
import {gt} from "drizzle-orm";

const sqlite = new Database(process.env.DB_FILE_NAME!);
const db = drizzle({client: sqlite});

const minio = new S3Client({
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
    bucket: "public",
    // Make sure to use the correct endpoint URL
    // It might not be localhost in production!
    endpoint: process.env.MINIO_BASE_URL,
});

const PAGE_SIZE = 99;

export async function withProcessImages() {
    let cursor = 0;
    let goodImages = await getNextGoodImages(cursor);
    console.log(`Processing ${goodImages.length} images`)

    while (goodImages.length > 0) {
        const token = await getToken();
        const tokenSystem = await getTokenSystem(token);

        for (const goodImage of goodImages) {
            console.log(`Processing image ${goodImage.FilingNumber} of good ${goodImage.GoodId}`)

            console.time("Get buffer image")
            const stream = await useQuery('/remate-virtual/api/v1/common/getBlobStorageInvitadoPorNroRadicado', {
                method: "POST",
                body: JSON.stringify({
                    nroRadicado: goodImage.FilingNumber,
                    usuarioSistema: tokenSystem,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            console.timeEnd("Get buffer image")

            console.time("Processing image")
            const response = await stream.json();
            const buffer = await sharp(Buffer.from(response.body, 'base64'))
                .jpeg({quality: 60})
                .toBuffer();
            await minio.write(`${goodImage.GoodId}/${goodImage.FilingNumber}.jpeg`, buffer);
            console.timeEnd("Processing image")

            cursor += PAGE_SIZE;
            goodImages = await getNextGoodImages(cursor)
        }
    }
}

const getNextGoodImages = async (cursor?: number, pageSize = PAGE_SIZE) => {
    return db.select()
        .from(GoodsImages)
        .where(cursor ? gt(GoodsImages.GoodId, cursor) : undefined)
        .limit(pageSize)
        .orderBy(GoodsImages.GoodId)
}