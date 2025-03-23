import {getToken, getTokenSystem, useQuery} from "./login.ts";
import sharp from "sharp";
import {GoodsImages} from "./db/schema.ts";
import {eq} from "drizzle-orm";
import {db} from "./client/db.client.ts";
import {minio} from "./client/s3.client.ts";


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
                const response = await stream.json();
                const bufferPayload = Buffer.from(response.body, 'base64');
                console.timeEnd("Get buffer image")

                const sizeInBytes = bufferPayload.byteLength;
                const sizeInKB = sizeInBytes / 1024;

                console.time(`Processing image with size of ${sizeInKB.toFixed(2)} KB`)
                const buffer = await sharp(bufferPayload)
                    .jpeg({quality: 60})
                    .toBuffer();
                await minio.write(`${goodImage.GoodId}/${goodImage.FilingNumber}.jpeg`, buffer);
                console.timeEnd(`Processing image with size of ${sizeInKB.toFixed(2)} KB`)
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