import {Database} from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import {AuctionState, Autos, RecordState} from "./src/db/schema.ts";

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

            const state = object.estadoRemate;
            await db.insert(AuctionState).values({
                Serial: Bun.randomUUIDv7(),
                Id: state.id,
                AutoId: object.idAuto,
                DomainName: state.nombreDominio,
                Code: state.codigo,
                Description: state.descripcion,
                Active: state.activo,
                CreatedBy: state.creado,
                CreationDate: state.fechaCreacion,
                ModifiedBy: state.modificadoPor,
                ModificationDate: state.fechaModificacion,
            })

            const stateRegister = object.estadoRegistro;
            await db.insert(RecordState).values({
                Serial: Bun.randomUUIDv7(),
                Id: stateRegister.id,
                AutoId: object.idAuto,
                DomainName: stateRegister.nombreDominio,
                Code: stateRegister.codigo,
                Description: stateRegister.descripcion,
                Active: stateRegister.activo,
                CreatedBy: stateRegister.creado,
                CreationDate: stateRegister.fechaCreacion,
                ModifiedBy: stateRegister.modificadoPor,
                ModificationDate: stateRegister.fechaModificacion,
            })
        } catch (e) {
            console.error('Error processing object, caused by ', e)
        }
    }
})()