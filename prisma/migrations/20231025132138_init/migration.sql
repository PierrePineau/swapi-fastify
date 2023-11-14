-- CreateTable
CREATE TABLE `films` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `starships` INTEGER NULL,
    `edited` DATETIME(3) NULL,
    `vehicles` INTEGER NULL,
    `planets` INTEGER NULL,
    `producer` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL,
    `episode_id` INTEGER NULL,
    `director` VARCHAR(191) NULL,
    `release_date` DATETIME(3) NULL,
    `opening_crawl` VARCHAR(191) NULL,
    `characters` INTEGER NULL,
    `species` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `people` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edited` DATETIME(3) NULL,
    `name` VARCHAR(191) NULL,
    `created` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `skin_color` VARCHAR(191) NULL,
    `hair_color` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `eye_color` VARCHAR(191) NULL,
    `mass` VARCHAR(191) NULL,
    `homeworld` INTEGER NULL,
    `birth_year` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edited` DATETIME(3) NULL,
    `climate` VARCHAR(191) NULL,
    `surface_water` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `diameter` VARCHAR(191) NULL,
    `rotation_period` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL,
    `terrain` VARCHAR(191) NULL,
    `gravity` VARCHAR(191) NULL,
    `orbital_period` VARCHAR(191) NULL,
    `population` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `species` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edited` VARCHAR(191) NULL,
    `classification` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL,
    `eye_colors` VARCHAR(191) NULL,
    `people` INTEGER NULL,
    `skin_colors` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `hair_colors` VARCHAR(191) NULL,
    `homeworld` INTEGER NULL,
    `average_lifespan` VARCHAR(191) NULL,
    `average_height` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `starships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pilots` JSON NULL,
    `MGLT` VARCHAR(191) NULL,
    `starship_class` VARCHAR(191) NULL,
    `hyperdrive_rating` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edited` DATETIME(3) NULL,
    `consumables` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `created` VARCHAR(191) NULL,
    `cargo_capacity` VARCHAR(191) NULL,
    `passengers` VARCHAR(191) NULL,
    `max_atmosphering_speed` VARCHAR(191) NULL,
    `crew` VARCHAR(191) NULL,
    `lenght` VARCHAR(191) NULL,
    `model` VARCHAR(191) NULL,
    `cost_in_credits` VARCHAR(191) NULL,
    `manufacturer` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_class` VARCHAR(191) NULL,
    `pilots` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
