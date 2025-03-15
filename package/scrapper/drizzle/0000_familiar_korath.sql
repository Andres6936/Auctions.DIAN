CREATE TABLE `ActingAs` (
	`Id` integer PRIMARY KEY NOT NULL,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text
);
--> statement-breakpoint
CREATE TABLE `AuctionState` (
	`Id` integer PRIMARY KEY NOT NULL,
	`AutoId` integer,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text,
	FOREIGN KEY (`AutoId`) REFERENCES `Autos`(`IdAuto`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Autos` (
	`IdAuto` integer PRIMARY KEY NOT NULL,
	`AutoNumber` text,
	`DelegationResolutionNumber` text,
	`DelegationResolutionDate` text,
	`AutoDate` text,
	`FileNumber` text,
	`SectionalAddress` text,
	`Dependency` text,
	`AutoDescription` text,
	`Commissioner` integer,
	`BiddingPercentage` integer,
	`TotalBiddingBaseValue` text,
	`BidPercentage` text,
	`BidValue` text,
	`DepositAccountNumber` text,
	`TotalAppraisalValue` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text
);
--> statement-breakpoint
CREATE TABLE `Departments` (
	`IdDepartment` integer PRIMARY KEY NOT NULL,
	`DepartmentName` text,
	`DepartmentCode` text
);
--> statement-breakpoint
CREATE TABLE `GoodType` (
	`Id` integer PRIMARY KEY NOT NULL,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text
);
--> statement-breakpoint
CREATE TABLE `Goods` (
	`IdGood` integer PRIMARY KEY NOT NULL,
	`AutoId` integer,
	`GoodTypeId` integer,
	`PropertyTypeId` integer,
	`GoodIdentification` text,
	`DepartmentId` integer,
	`MunicipalityId` integer,
	`Address` text,
	`OwnershipPercentage` integer,
	`GoodDescription` text,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text,
	`ZoneId` integer,
	FOREIGN KEY (`AutoId`) REFERENCES `Autos`(`IdAuto`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `GoodsImages` (
	`IdImage` integer PRIMARY KEY NOT NULL,
	`GoodId` integer,
	`FilingNumber` integer,
	`ImageStorageUrl` text,
	`ImageName` text,
	`ImagePath` text,
	FOREIGN KEY (`GoodId`) REFERENCES `Goods`(`IdGood`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `HearingState` (
	`Id` integer PRIMARY KEY NOT NULL,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text
);
--> statement-breakpoint
CREATE TABLE `Hearings` (
	`IdHearing` integer PRIMARY KEY NOT NULL,
	`AutoId` integer,
	`ActingAs` integer,
	`HearingState` integer,
	`HearingDate` text,
	`HearingTime` text,
	`HearingEndDate` text,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text,
	FOREIGN KEY (`AutoId`) REFERENCES `Autos`(`IdAuto`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Keywords` (
	`IdKeyword` integer PRIMARY KEY NOT NULL,
	`AutoId` integer,
	`Keyword` text,
	FOREIGN KEY (`AutoId`) REFERENCES `Autos`(`IdAuto`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Municipalities` (
	`IdMunicipality` integer PRIMARY KEY NOT NULL,
	`DepartmentId` integer,
	`MunicipalityName` text,
	`MunicipalityCode` text,
	`DepartmentCode` text,
	FOREIGN KEY (`DepartmentId`) REFERENCES `Departments`(`IdDepartment`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PropertyType` (
	`Id` integer PRIMARY KEY NOT NULL,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text
);
--> statement-breakpoint
CREATE TABLE `RecordState` (
	`Id` integer PRIMARY KEY NOT NULL,
	`AutoId` integer,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text,
	FOREIGN KEY (`AutoId`) REFERENCES `Autos`(`IdAuto`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Zones` (
	`Id` integer PRIMARY KEY NOT NULL,
	`DomainName` text,
	`Code` integer,
	`Description` text,
	`Active` integer,
	`CreatedBy` text,
	`CreationDate` text,
	`ModifiedBy` text,
	`ModificationDate` text
);
