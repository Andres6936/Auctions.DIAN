import {Database} from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import {Autos} from "./src/db/schema.ts";

const sqlite = new Database(process.env.DB_FILE_NAME!);
const db = drizzle({client: sqlite});

(async () => {
    const query = sqlite.query("SELECT * FROM Auctions LIMIT 10");
    for (const row of query.iterate()) {
        try {
            const payload = JSON.parse(row.Payload)
            if (!(payload instanceof Array)) {
                console.error("The payload is not an array, skipping...")
                continue;
            }

            if (payload.length === 0) {
                console.error("The payload is empty, skipping...")
                continue;
            }

            if (payload.length >= 2) {
                console.error("The payload has more than one element, skipping...")
                continue;
            }

            const object = payload[0];

            await db.insert(Autos).values({
                IdAuto: object.idAuto,
                AutoNumber: object.nroAuto,
                DelegationResolutionNumber: object.nroResolucionDelegacion,
                DelegationResolutionDate: object.fechaResolucionDelegacion,
                AutoDate: object.fechaAuto,
                FileNumber: object.nroExpedente.trim(),
                SectionalAddress: object.direccionSeccional,
                Dependency: object.dependencia,
                AutoDescription: object.descripcionAuto,
                Commissioner: object.comisionado,
                BiddingPercentage: object.porcentajeLicitacion,
                TotalBiddingBaseValue: object.valorTotalBaseLicitacion,
                BidPercentage: object.porcentajePostura,
                BidValue: object.valorPostura,
                DepositAccountNumber: object.nroCuentaDeposito,
                TotalAppraisalValue: object.valorTotalAvaluos,
                CreatedBy: object.creadoPor,
                CreationDate: object.fechaCreacion,
                ModifiedBy: object.modificadoPor,
                ModificationDate: object.fechaModificacion,
            })
        } catch (e) {
            console.error('Error processing object, caused by ', e)
        }
    }
})()