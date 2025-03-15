import {processRow} from "./src/extractor.ts";

const useQuery = async (url: string, options?: RequestInit) => {
    return await fetch(new URL(url, process.env.BASE_URL).href, options);
}

const getToken = async () => {
    const stream = await useQuery("/remate-virtual/api/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            usernameOrEmail: "EnEtldJjmen8BQk8XlbS6Ua5f7W3MhQ5lMmOEnIWyxM=",
            password: "JWG4oaaul1oX+fxYdUDO/r7HPcxjwMPnRDHfgf2oy5I="
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const payload = await stream.json();
    return payload.accessToken;
}

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
