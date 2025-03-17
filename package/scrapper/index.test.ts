import {getToken, useQuery} from "./src/login.ts";

import { S3Client } from "bun";
import sharp from "sharp";

const minio = new S3Client({
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
    bucket: "public",
    // Make sure to use the correct endpoint URL
    // It might not be localhost in production!
    endpoint: process.env.MINIO_BASE_URL,
});


(async () => {
    const token = await getToken();
    const stream = await useQuery('/remate-virtual/api/v1/common/getBlobStorageInvitadoPorNroRadicado', {
        method: "POST",
        body: JSON.stringify({
            nroRadicado: 52631376171995,
            usuarioSistema: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDIxNzU2MDcsInN1YiI6Ijk5OS0xIiwiYXVkIjpbIldvMGFLQWxCN3ZSUF8xNmZyUEkxeDlacGhCRWEiXSwiaXNzIjoiaHR0cHM6XC9cL211aXNjYS5kaWFuLmdvdi5jbyIsImp0aSI6IjUwNTE4NDVjLWEzNTktNDE5Yy1iM2NjLWU1NGYyZWYzN2FjOSIsImlhdCI6MTc0MjE3MjAwN30._n8Xf1UgXZuk6M5jiw67eAmcNU-THbnvBC85K8qVUdI",
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
})()