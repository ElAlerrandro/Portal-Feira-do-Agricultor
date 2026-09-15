create table `administrators` (
    `id` varchar(100) not null,
    `name` varchar(100) not null,
    `email` varchar(100) not null,
    `password` varchar(100) not null,
    `createdAt` date not null,
    primary key (`id`),
    unique key `administrators_unique` (`email`)
)engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

create table `producers` (
    `id` varchar(100) not null,
    `name` varchar(100) not null,
    `cpfCnpj` varchar(100) default null,
    `email` varchar(100) default null,
    `phone` varchar(100) default null,
    `address` varchar(100) default null,
    `description` varchar(100) default null,
    `photoUrl` varchar(100) default null,
    `active` tinyint(1) default 1,
    `createdAt` date not null,
    primary key (`id`),
    unique key `producers_unique` (`cpfCnpj`)
)engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


create table `productCategories` (
`id` varchar(100) not null,
`name` varchar(100) not null,
primary key (`id`),
unique key `categoriasProduto_unique` (`name`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;


create table `products` (
    `id` varchar(100) not null,
    `producerId` varchar(100) not null,
    `categoryId` varchar(100) not null,
    `name` varchar(100) not null,
    `description` varchar(100) default null,
    `unitMeasure` varchar(100) not null,
    `price` decimal(10,2) default null,
    `availability` tinyint(1) not null default 1,
    `fotoUrl` varchar(100) default null,
    `createdAt` date not null,
    primary key (`id`),
    key `products_producers_FK` (`producerId`),
    key `products_productCategories_FK`(`categoryId`),
    constraint `products_producers_FK` foreign key (`producerId`) references `producers` (`id`)
    constraint `products_productCategories_FK` foreign key (`categoryId`) references `productCategories` (`id`)
) engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

create table `events` (
    `id` varchar(100) not null,
    `title` varchar(100) not null,
    `description` varchar(100) default null,
    `date` date not null,
    `location` varchar(100) not null,
)engine = InnoDB default CHARSET = utf8mb4 collate = utf8mb4_general_ci;

