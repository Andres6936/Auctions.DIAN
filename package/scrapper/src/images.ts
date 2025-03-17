import {Database} from "bun:sqlite";
import {drizzle} from "drizzle-orm/bun-sqlite";
import {getToken, getTokenSystem, useQuery} from "./login.ts";
import sharp from "sharp";
import {S3Client} from "bun";
import {GoodsImages} from "./db/schema.ts";
import {eq, gt} from "drizzle-orm";

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
    const errors = []
    let currentPage = 1;
    let query = await getNextGoodImages(currentPage, PAGE_SIZE);
    console.log(`Processing ${query.length} images in the page: ${currentPage}`)

    while (query.length > 0) {
        const token = await getToken();
        const tokenSystem = await getTokenSystem(token);

        for (const row of query) {
            const goodImage = row.GoodsImages;
            try {
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
            } catch (e: any) {
                console.error(`Cannot process image (${goodImage.FilingNumber}), caused by: `, e.message)
                errors.push({
                    GoodId: goodImage.GoodId,
                    Image: goodImage.FilingNumber,
                    Error: e.message,
                })
            }
        }

        console.log(`Processing the next block of images in the page: ${currentPage}`)
        currentPage += 1;
        query = await getNextGoodImages(currentPage, PAGE_SIZE)
    }

    console.log("Writing errors to file")
    await Bun.write("errors.json", JSON.stringify(errors, null, 2))
}

const getNextGoodImages = async (page = 1, pageSize = PAGE_SIZE) => {
    const subQuery = db.select({Id: GoodsImages.IdImage})
        .from(GoodsImages)
        .orderBy(GoodsImages.GoodId)
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .as('subquery')

    return db.select()
        .from(GoodsImages)
        .innerJoin(subQuery, eq(GoodsImages.IdImage, subQuery.Id))
        .orderBy(GoodsImages.IdImage)
}