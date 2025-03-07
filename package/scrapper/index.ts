import { Database } from "bun:sqlite";

const db = new Database("Auctions.sqlite");

db.query(`
    CREATE TABLE IF NOT EXISTS Auctions (
        "Serial" INTEGER PRIMARY KEY AUTOINCREMENT,
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
const streamAuctions = await useQuery("/remate-virtual/api/v1/revautos/list/0/25", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

console.log("Auctions:")
const auctions = await streamAuctions.json();
for (const auction of auctions) {
    console.log("Inserting value of auction")
    db.query(`INSERT INTO Auctions ("Payload") VALUES ('${JSON.stringify(auction)}')`).run()
}
