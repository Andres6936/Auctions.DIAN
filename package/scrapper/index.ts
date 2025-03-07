import {Database} from "bun:sqlite";

const db = new Database("Auctions.sqlite");

// Scoped block of code, used for initialize
{
    using query = db.query(`
        CREATE TABLE IF NOT EXISTS Auctions
        (
            "Serial"   INTEGER PRIMARY KEY AUTOINCREMENT,
            "Id"       INTEGER NOT NULL,
            "Key"      TEXT    NOT NULL,
            "Official" TEXT    NOT NULL,
            "Type"     TEXT    NOT NULL,
            "Payload"  TEXT    NOT NULL
        )
    `);
    query.run();
}

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

console.time("Query the last index of sequence")
const {Index} = await db.query("SELECT MAX(Id) AS 'Index' FROM Auctions").get() as { Index: number };
console.timeEnd("Query the last index of sequence")

for (let index = Index; index < 3000; index++) {
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


        using query = db.query(
            `INSERT INTO Auctions ("Id", "Type", "Key", "Official", "Payload")
             VALUES (${index},
                     'application/json',
                     '${JSON.stringify(key)}',
                     '${JSON.stringify(official)}',
                     '${JSON.stringify(auction)}')`
        );
        query.run();
        console.timeEnd(`Processing auction (${index})`)

    } catch (e) {
        console.time(`Skipping request (${index})`)
        using query = db.query(
            `INSERT INTO Auctions ("Id", "Type", "Key", "Official", "Payload")
             VALUES (${index},
                     'application/text',
                     '{}',
                     '{}',
                     '${JSON.stringify(e)}')`
        );
        query.run()
        console.timeEnd(`Skipping request (${index})`)
    }

    // Wait 500ms
    await Bun.sleep(500);
}

// Clean up function
db.close();