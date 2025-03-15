import {integer, sqliteTable, text,} from 'drizzle-orm/sqlite-core';

// Main table: Autos
export const Autos = sqliteTable('Autos', {
    IdAuto: integer('IdAuto').primaryKey(),
    AutoNumber: text('AutoNumber'),
    DelegationResolutionNumber: text('DelegationResolutionNumber'),
    DelegationResolutionDate: text('DelegationResolutionDate'),
    AutoDate: text('AutoDate'),
    FileNumber: text('FileNumber'),
    SectionalAddress: text('SectionalAddress'),
    Dependency: text('Dependency'),
    AutoDescription: text('AutoDescription'),
    Commissioner: integer('Commissioner'),
    BiddingPercentage: integer('BiddingPercentage'),
    TotalBiddingBaseValue: text('TotalBiddingBaseValue'),
    BidPercentage: text('BidPercentage'),
    BidValue: text('BidValue'),
    DepositAccountNumber: text('DepositAccountNumber'),
    TotalAppraisalValue: integer('TotalAppraisalValue'),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: AuctionState
export const AuctionState = sqliteTable('AuctionState', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    AutoId: integer('AutoId').references(() => Autos.IdAuto),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: RecordState
export const RecordState = sqliteTable('RecordState', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    AutoId: integer('AutoId').references(() => Autos.IdAuto),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: Goods
export const Goods = sqliteTable('Goods', {
    IdGood: integer('IdGood').primaryKey(),
    AutoId: integer('AutoId').references(() => Autos.IdAuto),
    GoodTypeId: integer('GoodTypeId'),
    PropertyTypeId: integer('PropertyTypeId'),
    GoodIdentification: text('GoodIdentification'),
    DepartmentId: integer('DepartmentId'),
    MunicipalityId: integer('MunicipalityId'),
    Address: text('Address'),
    OwnershipPercentage: integer('OwnershipPercentage'),
    GoodDescription: text('GoodDescription'),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
    ZoneId: integer('ZoneId'),
});

// Table: GoodType
export const GoodType = sqliteTable('GoodType', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: PropertyType
export const PropertyType = sqliteTable('PropertyType', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: Departments
export const Departments = sqliteTable('Departments', {
    IdDepartment: integer('IdDepartment').primaryKey(),
    DepartmentName: text('DepartmentName'),
    DepartmentCode: text('DepartmentCode'),
});

// Table: Municipalities
export const Municipalities = sqliteTable('Municipalities', {
    IdMunicipality: integer('IdMunicipality').primaryKey(),
    DepartmentId: integer('DepartmentId').references(() => Departments.IdDepartment),
    MunicipalityName: text('MunicipalityName'),
    MunicipalityCode: text('MunicipalityCode'),
    DepartmentCode: text('DepartmentCode'),
});

// Table: GoodsImages
export const GoodsImages = sqliteTable('GoodsImages', {
    IdImage: integer('IdImage').primaryKey(),
    GoodId: integer('GoodId').references(() => Goods.IdGood),
    FilingNumber: integer('FilingNumber'),
    ImageStorageUrl: text('ImageStorageUrl'),
    ImageName: text('ImageName'),
    ImagePath: text('ImagePath'),
});

// Table: Zones
export const Zones = sqliteTable('Zones', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: Hearings
export const Hearings = sqliteTable('Hearings', {
    IdHearing: integer('IdHearing').primaryKey(),
    AutoId: integer('AutoId').references(() => Autos.IdAuto),
    ActingAs: integer('ActingAs'),
    HearingState: integer('HearingState'),
    HearingDate: text('HearingDate'),
    HearingTime: text('HearingTime'),
    HearingEndDate: text('HearingEndDate'),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: ActingAs
export const ActingAs = sqliteTable('ActingAs', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: HearingState
export const HearingState = sqliteTable('HearingState', {
    Serial: text().primaryKey(),
    Id: integer('Id'),
    DomainName: text('DomainName'),
    Code: integer('Code'),
    Description: text('Description'),
    Active: integer('Active', {mode: 'boolean'}),
    CreatedBy: text('CreatedBy'),
    CreationDate: text('CreationDate'),
    ModifiedBy: text('ModifiedBy'),
    ModificationDate: text('ModificationDate'),
});

// Table: Keywords
export const Keywords = sqliteTable('Keywords', {
    IdKeyword: integer('IdKeyword').primaryKey(),
    AutoId: integer('AutoId').references(() => Autos.IdAuto),
    Keyword: text('Keyword'),
});