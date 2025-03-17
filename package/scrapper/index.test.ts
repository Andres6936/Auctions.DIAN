import {getToken, useQuery} from "./src/login.ts";

import { S3Client } from "bun";

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
            usuarioSistema: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDIxNzExMzEsInN1YiI6Ijk5OS0xIiwiYXVkIjpbIldvMGFLQWxCN3ZSUF8xNmZyUEkxeDlacGhCRWEiXSwiaXNzIjoiaHR0cHM6XC9cL211aXNjYS5kaWFuLmdvdi5jbyIsImp0aSI6IjU1NTE3OTEzLTg4NDgtNGY1ZS04YmFiLWQ3YmU0YjkyYmQzZiIsImlhdCI6MTc0MjE2NzUzMX0.nb5U8W-KhhxmOUfzLBBTt9dBilSQ6CPZAmV0ezOe7dI",
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    const response = await stream.json();
    const buffer = Buffer.from(response.body, 'base64');
    await minio.write('A.jpeg', buffer);
})()