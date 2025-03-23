import {db} from "../client/db.client.ts";
import {GoodsImages} from "../db/schema.ts";
import {like} from "drizzle-orm";
import {getToken, getTokenSystem, useQuery} from "../login.ts";
import sharp from "sharp";
import bmp from 'sharp-bmp';
import {minio} from "../client/s3.client.ts";

const NUMBER_FILE = '52631116328224';
const EXTENSION_FILE = 'pdf';

(async () => {
    const token = await getToken();
    const tokenSystem = await getTokenSystem(token);
    try {
        const stream = await useQuery('/remate-virtual/api/v1/common/getBlobStorageInvitadoPorNroRadicado', {
            method: "POST",
            body: JSON.stringify({
                nroRadicado: NUMBER_FILE,
                usuarioSistema: tokenSystem,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await stream.json();
        const bufferPayload = Buffer.from(response.body, 'base64');

        const sizeInBytes = bufferPayload.byteLength;
        const sizeInKB = sizeInBytes / 1024;

        console.time(`Processing file with size of ${sizeInKB.toFixed(2)} KB`)
        await Bun.write(`Output.${EXTENSION_FILE}`, bufferPayload)

    } catch (e: any) {
        console.error(`Cannot process file, caused by: `, e.message)
    }
})()