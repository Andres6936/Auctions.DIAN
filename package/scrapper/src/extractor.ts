import {Database} from "bun:sqlite";
import {
    ActingAs,
    AuctionState,
    Autos,
    Departments, Goods,
    GoodsImages,
    GoodType, Hearings, HearingState,
    Municipalities,
    PropertyType,
    RecordState
} from "./db/schema.ts";
import {drizzle} from "drizzle-orm/bun-sqlite";

const sqlite = new Database(process.env.DB_FILE_NAME!);
const db = drizzle({client: sqlite});

export async function processRow(id: number, payload: any) {
    try {
        if (!(payload instanceof Array)) {
            console.error("The payload is not an array, skipping...")
            return;
        }

        if (payload.length === 0) {
            console.error("The payload is empty, skipping...")
            return;
        }

        if (payload.length >= 2) {
            console.error("The payload has more than one element, skipping...")
            return;
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

        if (object.revPalabrasClaves.length > 0) {
            console.log('Found register with keywords: ', id)
        }

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
            if (property) {
                await db.insert(PropertyType).values({
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
                })
            }

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

            const images = good.revBienesImagenes;
            if (images.length >= 1) {
                await db.insert(GoodsImages).values(images.map(it => ({
                    IdImage: it.idImagen,
                    GoodId: good.idBien,
                    FilingNumber: it.nroRadicado,
                    ImageStorageUrl: it.urlStorageImagen,
                    ImageName: it.nombreImagen,
                    ImagePath: it.rutaImagen,
                })))
            }

            const zone = good.idZona;
            await db.insert(Goods).values({
                IdGood: good.idBien,
                AutoId: object.idAuto,
                GoodTypeId: typeId.Id,
                TypeProperty: property.descripcion?.toUpperCase() ?? null,
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
                TypeZone: zone.descripcion.toUpperCase(),
            })
        }

        const hearings = object.revAudiencias;
        for (let hearing of hearings) {
            if (hearing.revActa) {
                console.log("Found register with act: ", id)
            }

            const actingAs = hearing.actuandoComo;
            await db.insert(ActingAs).values({
                Serial: Bun.randomUUIDv7(),
                Id: actingAs.id,
                DomainName: actingAs.nombreDominio,
                Code: actingAs.codigo,
                Description: actingAs.descripcion,
                Active: actingAs.activo,
                CreatedBy: actingAs.creado,
                CreationDate: actingAs.fechaCreacion,
                ModifiedBy: actingAs.modificadoPor,
                ModificationDate: actingAs.fechaModificacion,
            })

            const hearingState = hearing.estadoAudiencia;
            await db.insert(HearingState).values({
                Serial: Bun.randomUUIDv7(),
                Id: hearingState.id,
                DomainName: hearingState.nombreDominio,
                Code: hearingState.codigo,
                Description: hearingState.descripcion,
                Active: hearingState.activo,
                CreatedBy: hearingState.creado,
                CreationDate: hearingState.fechaCreacion,
                ModifiedBy: hearingState.modificadoPor,
                ModificationDate: hearingState.fechaModificacion,
            })

            await db.insert(Hearings).values({
                IdHearing: hearing.idAudiencia,
                AutoId: object.idAuto,
                ActingAs: actingAs.id,
                HearingState: hearingState.id,
                HearingDate: hearing.fechaAudiencia,
                HearingTime: hearing.horaAudiencia,
                HearingEndDate: hearing.fechaFinAudiencia,
                CreatedBy: hearing.creadoPor,
                CreationDate: hearing.fechaCreacion,
                ModifiedBy: hearing.modificadoPor,
                ModificationDate: hearing.fechaModificacion,
            })
        }
    } catch (e) {
        console.error('Error processing object, caused by ', e, `Row: ${id}`)
    }
}
