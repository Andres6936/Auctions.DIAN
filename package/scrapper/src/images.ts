import {Database} from "bun:sqlite";
import {drizzle} from "drizzle-orm/bun-sqlite";
import {getToken, getTokenSystem, useQuery} from "./login.ts";
import sharp from "sharp";
import {S3Client} from "bun";

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


export async function withProcessImages() {
    const token = await getToken();
    const tokenSystem = await getTokenSystem(token);
    const stream = await useQuery('/remate-virtual/api/v1/common/getBlobStorageInvitadoPorNroRadicado', {
        method: "POST",
        body: JSON.stringify({
            nroRadicado: 52631376171995,
            usuarioSistema: tokenSystem,
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const response = await stream.json();
    const buffer = Buffer.from(response.body, 'base64');
    await Bun.write('A-Original.jpeg', buffer);
    await sharp(buffer).jpeg({quality: 80}).toFile('A-Quality-80.jpeg');
    await sharp(buffer).jpeg({quality: 70}).toFile('A-Quality-70.jpeg');
    await sharp(buffer).jpeg({quality: 60}).toFile('A-Quality-60.jpeg');

}