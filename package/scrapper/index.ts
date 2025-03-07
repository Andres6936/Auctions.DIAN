import {Database} from "bun:sqlite";

const db = new Database("Auctions.sqlite");

db.query(`
    CREATE TABLE IF NOT EXISTS Auctions
    (
        "Serial"  INTEGER PRIMARY KEY AUTOINCREMENT,
        "Id" INTEGER NOT NULL,
        "Key" TEXT NOT NULL ,
        "Official" TEXT NOT NULL,
        "Type" TEXT NOT NULL,
        "Payload" TEXT NOT NULL
    )
`).run();

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

console.log("Getting auctions")
for (let index = 0; index < 3000; index++) {
    try {
        console.time(`Processing auction (${index})`)
        const [streamAuction, streamKey, streamOfficial] = await Promise.all([
            useQuery(`/remate-virtual/api/v1/remate/bienes/getAll/${index}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            useQuery(`/remate-virtual/api/v1/revautos/palabrasClave/${index}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            useQuery(`/remate-virtual/api/v1/remate/contactarencargado/buscarencagadobyauto/${index}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ]);

        const [key, auction, official] = await Promise.all([
            streamKey.json(),
            streamAuction.json(),
            streamOfficial.json()
        ]);


        db.query(`INSERT INTO Auctions ("Id", "Type", "Key", "Official", "Payload")
                  VALUES (${index}, 
                          'application/json', 
                          '${JSON.stringify(key)}', 
                          '${JSON.stringify(official)}',
                          '${JSON.stringify(auction)}')`)
            .run()
        console.timeEnd(`Processing auction (${index})`)

    } catch (e) {
        console.log("Skipping request")
        db.query(`INSERT INTO Auctions ("Id", "Type", "Payload")
                  VALUES (${index}, 'application/text', '${JSON.stringify(e)}')`).run()
    }

    // Wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));
}

