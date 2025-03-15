-- Main table: Autos
CREATE TABLE Autos
(
    "IdAuto"                     INTEGER PRIMARY KEY,
    "AutoNumber"                 TEXT,
    "DelegationResolutionNumber" TEXT,
    "DelegationResolutionDate"   TEXT,
    "AutoDate"                   TEXT,
    "FileNumber"                 TEXT,
    "SectionalAddress"           TEXT,
    "Dependency"                 TEXT,
    "AutoDescription"            TEXT,
    "Commissioner"               INTEGER,
    "BiddingPercentage"          INTEGER,
    "TotalBiddingBaseValue"      TEXT,
    "BidPercentage"              TEXT,
    "BidValue"                   TEXT,
    "DepositAccountNumber"       TEXT,
    "TotalAppraisalValue"        INTEGER,
    "CreatedBy"                  TEXT,
    "CreationDate"               TEXT,
    "ModifiedBy"                 TEXT,
    "ModificationDate"           TEXT
);

-- Table: AuctionState
CREATE TABLE AuctionState
(
    "Id"               INTEGER PRIMARY KEY,
    "AutoId"           INTEGER,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT,
    FOREIGN KEY ("AutoId") REFERENCES Autos ("IdAuto")
);

-- Table: RecordState
CREATE TABLE RecordState
(
    "Id"               INTEGER PRIMARY KEY,
    "AutoId"           INTEGER,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT,
    FOREIGN KEY ("AutoId") REFERENCES Autos ("IdAuto")
);

-- Table: Goods
CREATE TABLE Goods
(
    "IdGood"              INTEGER PRIMARY KEY,
    "AutoId"              INTEGER,
    "GoodTypeId"          INTEGER,
    "PropertyTypeId"      INTEGER,
    "GoodIdentification"  TEXT,
    "DepartmentId"        INTEGER,
    "MunicipalityId"      INTEGER,
    "Address"             TEXT,
    "OwnershipPercentage" INTEGER,
    "GoodDescription"     TEXT,
    "CreatedBy"           TEXT,
    "CreationDate"        TEXT,
    "ModifiedBy"          TEXT,
    "ModificationDate"    TEXT,
    "ZoneId"              INTEGER,
    FOREIGN KEY ("AutoId") REFERENCES Autos ("IdAuto")
);

-- Table: GoodType
CREATE TABLE GoodType
(
    "Id"               INTEGER PRIMARY KEY,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT
);

-- Table: PropertyType
CREATE TABLE PropertyType
(
    "Id"               INTEGER PRIMARY KEY,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT
);

-- Table: Departments
CREATE TABLE Departments
(
    "IdDepartment"   INTEGER PRIMARY KEY,
    "DepartmentName" TEXT,
    "DepartmentCode" TEXT
);

-- Table: Municipalities
CREATE TABLE Municipalities
(
    "IdMunicipality"   INTEGER PRIMARY KEY,
    "DepartmentId"     INTEGER,
    "MunicipalityName" TEXT,
    "MunicipalityCode" TEXT,
    "DepartmentCode"   TEXT,
    FOREIGN KEY ("DepartmentId") REFERENCES Departments ("IdDepartment")
);

-- Table: GoodsImages
CREATE TABLE GoodsImages
(
    "IdImage"         INTEGER PRIMARY KEY,
    "GoodId"          INTEGER,
    "FilingNumber"    INTEGER,
    "ImageStorageUrl" TEXT,
    "ImageName"       TEXT,
    "ImagePath"       TEXT,
    FOREIGN KEY ("GoodId") REFERENCES Goods ("IdGood")
);

-- Table: Zones
CREATE TABLE Zones
(
    "Id"               INTEGER PRIMARY KEY,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT
);

-- Table: Hearings
CREATE TABLE Hearings
(
    "IdHearing"        INTEGER PRIMARY KEY,
    "AutoId"           INTEGER,
    "ActingAs"         INTEGER,
    "HearingState"     INTEGER,
    "HearingDate"      TEXT,
    "HearingTime"      TEXT,
    "HearingEndDate"   TEXT,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT,
    FOREIGN KEY ("AutoId") REFERENCES Autos ("IdAuto")
);

-- Table: ActingAs
CREATE TABLE ActingAs
(
    "Id"               INTEGER PRIMARY KEY,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT
);

-- Table: HearingState
CREATE TABLE HearingState
(
    "Id"               INTEGER PRIMARY KEY,
    "DomainName"       TEXT,
    "Code"             INTEGER,
    "Description"      TEXT,
    "Active"           BOOLEAN,
    "CreatedBy"        TEXT,
    "CreationDate"     TEXT,
    "ModifiedBy"       TEXT,
    "ModificationDate" TEXT
);

-- Table: Keywords
CREATE TABLE Keywords
(
    "IdKeyword" INTEGER PRIMARY KEY,
    "AutoId"    INTEGER,
    "Keyword"   TEXT,
    FOREIGN KEY ("AutoId") REFERENCES Autos ("IdAuto")
);