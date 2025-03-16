import {processRow} from "./src/extractor.ts";
import {getToken, useQuery} from "./src/login.ts";

const token = await getToken();
for (let index = 0; index < 3000; index++) {
    try {
        console.time(`Processing auction (${index})`)
        const [streamAuction] = await Promise.all([
            useQuery(`/remate-virtual/api/v1/remate/bienes/getAll/${index}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        ]);

        const [auction] = await Promise.all([
            streamAuction.json(),
        ]);

        await processRow(index, auction);
        console.timeEnd(`Processing auction (${index})`)
    } catch (e) {

    }

    // Wait 500ms
    await Bun.sleep(250);
}
