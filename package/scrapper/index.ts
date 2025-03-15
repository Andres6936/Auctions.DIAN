import {Database} from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import {
    AuctionState,
    Autos,
    Departments,
    Goods,
    GoodType,
    Municipalities,
    PropertyType,
    RecordState, Zones
} from "./src/db/schema.ts";

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

            const goods = object.revBienes;
            for (const good of goods) {
                const type = good.idTipoBien;

                const [typeId] = await db.insert(GoodType).values({
                    Serial: Bun.randomUUIDv7(),
                    Id: type.id,
                    DomainName: type.nombreDominio,
                    Code: type.codigo,
                    Description: type.descripcion,
                    Active: type.activo,
                    CreatedBy: type.creado,
                    CreationDate: type.fechaCreacion,
                    ModifiedBy: type.modificadoPor,
                    ModificationDate: type.fechaModificacion,
                }).returning()

                const property = good.idTipoInmueble;
                const [propertyType] = await db.insert(PropertyType).values({
                    Serial: Bun.randomUUIDv7(),
                    Id: property.id,
                    DomainName: property.nombreDominio,
                    Code: property.codigo,
                    Description: property.descripcion,
                    Active: property.activo,
                    CreatedBy: property.creado,
                    CreationDate: property.fechaCreacion,
                    ModifiedBy: property.modificadoPor,
                    ModificationDate: property.fechaModificacion,
                }).returning();

                const department = good.idDepartamento;
                await db.insert(Departments).values({
                    IdDepartment: department.idDepartamento,
                    DepartmentName: department.nombreDepartamento,
                    DepartmentCode: department.codigoDepartamento,
                }).onConflictDoNothing()

                const municipality = good.idMunicipio;
                await db.insert(Municipalities).values({
                    IdMunicipality: municipality.idMunicipio,
                    DepartmentId: department.idDepartamento,
                    MunicipalityName: municipality.nombreMunicipio,
                    MunicipalityCode: municipality.codigoMunicipio,
                    DepartmentCode: municipality.codigoDepartamento
                }).onConflictDoNothing()

                const zone = good.idZona;
                await db.insert(Zones).values({
                    Serial: Bun.randomUUIDv7(),
                    Id: zone.id,
                    DomainName: zone.nombreDominio,
                    Code: zone.codigo,
                    Description: zone.descripcion,
                    Active: zone.activo,
                    CreatedBy: zone.creado,
                    CreationDate: zone.fechaCreacion,
                    ModifiedBy: zone.modificadoPor,
                    ModificationDate: zone.fechaModificacion,
                })

                await db.insert(Goods).values({
                    IdGood: good.idBien,
                    AutoId: object.idAuto,
                    GoodTypeId: typeId.Id,
                    PropertyTypeId: propertyType.Id,
                    GoodIdentification: good.identificacionBien,
                    DepartmentId: department.idDepartamento,
                    MunicipalityId: municipality.idMunicipio,
                    Address: good.direccion,
                    OwnershipPercentage: good.porcentajePropiedad,
                    GoodDescription: good.descripcionBien,
                    CreatedBy: good.creadoPor,
                    CreationDate: good.fechaCreacion,
                    ModifiedBy: good.modificadoPor,
                    ModificationDate: good.fechaModificacion,
                    ZoneId: zone.id,
                })
            }
        } catch (e) {
            console.error('Error processing object, caused by ', e)
        }
    }
})()