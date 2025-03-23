import {db} from "./src/client/db.client.ts";
import {GoodsImages} from "./src/db/schema.ts";
import {like} from "drizzle-orm";
import {getToken, getTokenSystem, useQuery} from "./src/login.ts";
import sharp from "sharp";
import {minio} from "./src/client/s3.client.ts";

(async () => {
    const query = await db.select()
        .from(GoodsImages)
        .orderBy(GoodsImages.GoodId)
        .where(like(GoodsImages.ImageName, '%.bmp'))

    if (query.length === 0) return;

    const token = await getToken();
    const tokenSystem = await getTokenSystem(token);
    for await (const row of query) {
        try {
            console.log(`Processing image ${row.FilingNumber} of good ${row.GoodId}`)

            console.time("Get buffer image")
            const stream = await useQuery('/remate-virtual/api/v1/common/getBlobStorageInvitadoPorNroRadicado', {
                method: "POST",
                body: JSON.stringify({
                    nroRadicado: row.FilingNumber,
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
            await minio.write(`${row.GoodId}/${row.FilingNumber}.jpeg`, buffer);
            console.timeEnd(`Processing image with size of ${sizeInKB.toFixed(2)} KB`)

        } catch (e: any) {
            console.error(`Cannot process image (${row.FilingNumber}), caused by: `, e.message)
        }
    }
})()