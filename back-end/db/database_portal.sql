create table `administrators` (
    `id` varchar(100) not null,
    `name` varchar(100) not null,
    `email` varchar(100) not null,
    `password` varchar(100) not null,
    `active` tinyint(1) not null default 1,
    `createdAt` date not null,
    primary key (`id`),
    unique key `administrators_unique` (`email`)
)engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


create table `fairInfo` (
    `id` varchar(100) not null,
    `name` varchar(100) not null,
    `description` varchar(100) default null,
    `address` varchar(100) default null,
    `latitude` decimal(10,7) default null,
    `longitude` decimal(10,7) default null,
    `businessHours` varchar(100) default null,
    primary key (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


create table `contactChannels` (
    `id` varchar(100) not null,
    `fairid` varchar(100) not null,
    `type` varchar(100) not null,
    `valor` varchar(100) not null,
    primary key (`id`),
    key `contactChannels_fairInfo_FK` (`fairId`)
    constraint `contactChannels_fairInfo_FK` foreign key (`fairId`) references `fairInfo` (`id`)
)engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


create table `events` (
    `id` varchar(100) not null,
    `title` varchar(100) not null,
    `description` varchar(100) default null,
    `startAt` date not null,
    `endAt` date default null,
    `location` varchar(100) default null,
    `imageURL` varchar(100) default null,
    `administratorId` varchar(100) default null,
    `createdAt` date not null,
    primary key (`id`),
    key `events_administrators_FK` (`administratorId`),
    constraint `events_administrators_FK` foreign key (`administratorId`) references `administrators` (`id`)
)engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;





-- banco que abrange a calculadora.

-- create table `administrators` (
--     `id` varchar(100) not null,
--     `name` varchar(100) not null,
--     `email` varchar(100) not null,
--     `password` varchar(100) not null,
--     `active` tinyint(1) not null default 1,
--     `createdAt` date not null,
--     primary key (`id`),
--     unique key `administrators_unique` (`email`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


-- create table `fairInfo` (
--     `id` varchar(100) not null,
--     `name` varchar(100) not null,
--     `description` varchar(100) default null,
--     `address` varchar(100) default null,
--     `latitude` decimal(10,7) default null,
--     `longitude` decimal(10,7) default null,
--     `businessHours` varchar(100) default null,
--     primary key (`id`)
-- ) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


-- create table `contactChannels` (
--     `id` varchar(100) not null,
--     `fairid` varchar(100) not null,
--     `type` varchar(100) not null,
--     `valor` varchar(100) not null,
--     primary key (`id`),
--     key `contactChannels_fairInfo_FK` (`fairId`)
--     constraint `contactChannels_fairInfo_FK` foreign key (`fairId`) references `fairInfo` (`id`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


-- create table `events` (
--     `id` varchar(100) not null,
--     `title` varchar(100) not null,
--     `description` varchar(100) default null,
--     `startAt` date not null,
--     `endAt` date default null,
--     `location` varchar(100) default null,
--     `imageURL` varchar(100) default null,
--     `administratorId` varchar(100) default null,
--     `createdAt` date not null,
--     primary key (`id`),
--     key `events_administrators_FK` (`administratorId`),
--     constraint `events_administrators_FK` foreign key (`administratorId`) references `administrators` (`id`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


-- create table `pricingCalculator` (
--     `id` varchar(100) not null,
--     `administratorId` varchar(100) not null,
--     `description` varchar(100) default null,
--     `totalProductionCost` decimal(10,2) not null,
--     `producedQty` decimal(10,2) not null,
--     `targetMargin` decimal(5,2) not null,
--     `unitCost` decimal(10, 2) generated always as 
--     (`totalProductionCost` / nullif(`producedQty`, 0)) stored,
--     `suggestedPrice` decimal(10, 2) generated always as 
--     ((`totalProductionCost` / nullif(`producedQty`, 0)) * (1 + `targetMargin` / 100)) stored,
--     `createdAt` date not null,
--     primary key (`id`),
--     key `pricingCalculator_administrators_FK` (`administratorId`),
--     constraint `pricingCalculator_administrators_FK` foreign key (`administratorId`) references `administrators` (`id`),
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;




-- Banco de dados total que abrage todas as tabelas, incluindo produtores, produtos, feiras, eventos e administradores.

-- create table `administrators` (
--     `id` varchar(100) not null,
--     `name` varchar(100) not null,
--     `email` varchar(100) not null,
--     `password` varchar(100) not null,
--     `active` tinyint(1) not null default 1,
--     `createdAt` date not null,
--     primary key (`id`),
--     unique key `administrators_unique` (`email`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- create table `recoveryTokens`(
--     `id` varchar(100) not null,
--     `administratorId` varchar(100) not null,
--     `token` varchar(100) not null,
--     `expires` date not null,
--     `used` tinyint(1) not null default 1,
--     `createdAt` date not null,
--     primary key (`id`),
--     unique key `recoveryTokens_unique` (`token`),
--     key `recoveryTokens_administratorFK` (`administratorId`),
--     constraint `recoveryTokens_administratorId_FK` foreign key (`administratorId`) references `administrators` (`id`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- create table `producers` (
--     `id` varchar(100) not null,
--     `name` varchar(100) not null,
--     `cpfCnpj` varchar(100) default null,
--     `email` varchar(100) default null,
--     `phone` varchar(100) default null,
--     `address` varchar(100) default null,
--     `description` varchar(100) default null,
--     `photoUrl` varchar(100) default null,
--     `active` tinyint(1) default 1,
--     `createdAt` date not null,
--     primary key (`id`),
--     unique key `producers_unique` (`cpfCnpj`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


-- create table `productCategories` (
-- `id` varchar(100) not null,
-- `name` varchar(100) not null,
-- primary key (`id`),
-- unique key `categoriasProduto_unique` (`name`)
-- ) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


-- create table `products` (
--     `id` varchar(100) not null,
--     `producerId` varchar(100) not null,
--     `categoryId` varchar(100) not null,
--     `name` varchar(100) not null,
--     `description` varchar(100) default null,
--     `unitMeasure` varchar(100) not null,
--     `price` decimal(10,2) default null,
--     `availability` tinyint(1) not null default 1,
--     `photoUrl` varchar(100) default null,
--     `createdAt` date not null,
--     primary key (`id`),
--     key `products_producers_FK` (`producerId`),
--     key `products_productCategories_FK`(`categoryId`),
--     constraint `products_producers_FK` foreign key (`producerId`) references `producers` (`id`),
--     constraint `products_productCategories_FK` foreign key (`categoryId`) references `productCategories` (`id`)
-- ) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- create table `fairInfo` (
--     `id` varchar(100) not null,
--     `name` varchar(100) not null,
--     `description` varchar(100) default null,
--     `address` varchar(100) default null,
--     `latitude` decimal(10,7) default null,
--     `longitude` decimal(10,7) default null,
--     `businessHours` varchar(100) default null,
--     primary key (`id`)
-- ) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- create table `contactChannels` (
--     `id` varchar(100) not null,
--     `fairid` varchar(100) not null,
--     `type` varchar(100) not null,
--     `valor` varchar(100) not null,
--     primary key (`id`),
--     key `contactChannels_fairInfo_FK` (`fairId`)
--     constraint `contactChannels_fairInfo_FK` foreign key (`fairId`) references `fairInfo` (`id`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- create table `events` (
--     `id` varchar(100) not null,
--     `title` varchar(100) not null,
--     `description` varchar(100) default null,
--     `startAt` date not null,
--     `endAt` date default null,
--     `location` varchar(100) default null,
--     `imageURL` varchar(100) default null,
--     `administratorId` varchar(100) default null,
--     `createdAt` date not null,
--     primary key (`id`),
--     key `events_administrators_FK` (`administratorId`),
--     constraint `events_administrators_FK` foreign key (`administratorId`) references `administrators` (`id`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

-- create table `pricingCalculator` (
--     `id` varchar(100) not null,
--     `producerId` varchar(100) not null,
--     `productId` varchar(100) default null,
--     `description` varchar(100) default null,
--     `totalProductionCost` decimal(10,2) not null,
--     `producedQty` decimal(10,2) not null,
--     `targetMargin` decimal(5,2) not null,
--     `unitCost` decimal(10, 2) generated always as 
--     (`totalProductionCost` / nullif(`producedQty`, 0)) stored,
--     `suggestedPrice` decimal(10, 2) generated always as 
--     ((`totalProductionCost` / nullif(`producedQty`, 0)) * (1 + `targetMargin` / 100)) stored,
--     `createdAt` date not null,
--     primary key (`id`),
--     key `pricingCalculator_producers_FK` (`producerId`),
--     key `pricingCalculator_product_FK` (`productId`),
--     constraint `pricingCalculator_producers_FK` foreign key (`producerId`) references `producers` (`id`),
--     constraint `pricingCalculator_products_FK` foreign key (`productId`) references `products` (`id`)
-- )engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;