/*
  Warnings:

  - You are about to drop the `films` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `people` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `planets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `species` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `starships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `films`;

-- DropTable
DROP TABLE `people`;

-- DropTable
DROP TABLE `planets`;

-- DropTable
DROP TABLE `species`;

-- DropTable
DROP TABLE `starships`;

-- DropTable
DROP TABLE `transport`;

-- DropTable
DROP TABLE `vehicles`;

-- CreateTable
CREATE TABLE `Starships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pilots` JSON NULL,
    `MGLT` VARCHAR(191) NULL,
    `starship_class` VARCHAR(191) NULL,
    `hyperdrive_rating` VARCHAR(191) NULL,
    `filmsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Films` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `edited` DATETIME(3) NULL,
    `producer` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL,
    `episode_id` INTEGER NULL,
    `director` VARCHAR(191) NULL,
    `release_date` DATETIME(3) NULL,
    `opening_crawl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `People` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filmsId` INTEGER NOT NULL,
    `spaciesId` INTEGER NOT NULL,
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
CREATE TABLE `Planets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filmsId` INTEGER NOT NULL,
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
CREATE TABLE `Species` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filmsId` INTEGER NOT NULL,
    `edited` VARCHAR(191) NULL,
    `classification` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `designation` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL,
    `eye_colors` VARCHAR(191) NULL,
    `skin_colors` VARCHAR(191) NULL,
    `language` VARCHAR(191) NULL,
    `hair_colors` VARCHAR(191) NULL,
    `homeworld` INTEGER NULL,
    `average_lifespan` VARCHAR(191) NULL,
    `average_height` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transport` (
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
CREATE TABLE `Vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_class` VARCHAR(191) NULL,
    `filmsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PeopleToVehicles` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PeopleToVehicles_AB_unique`(`A`, `B`),
    INDEX `_PeopleToVehicles_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Starships` ADD CONSTRAINT `Starships_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `People` ADD CONSTRAINT `People_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `People` ADD CONSTRAINT `People_spaciesId_fkey` FOREIGN KEY (`spaciesId`) REFERENCES `Species`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Planets` ADD CONSTRAINT `Planets_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Species` ADD CONSTRAINT `Species_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicles` ADD CONSTRAINT `Vehicles_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PeopleToVehicles` ADD CONSTRAINT `_PeopleToVehicles_A_fkey` FOREIGN KEY (`A`) REFERENCES `People`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PeopleToVehicles` ADD CONSTRAINT `_PeopleToVehicles_B_fkey` FOREIGN KEY (`B`) REFERENCES `Vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
