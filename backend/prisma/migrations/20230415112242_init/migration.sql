-- CreateTable
CREATE TABLE `Folder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,

    UNIQUE INDEX `Folder_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UploadedFile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fieldname` VARCHAR(191) NOT NULL,
    `originalname` VARCHAR(191) NOT NULL,
    `encoding` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `nameMini` VARCHAR(191) NOT NULL DEFAULT '',
    `path` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `folderTitle` VARCHAR(191) NULL,

    UNIQUE INDEX `UploadedFile_filename_key`(`filename`),
    UNIQUE INDEX `UploadedFile_nameMini_key`(`nameMini`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UploadedFile` ADD CONSTRAINT `UploadedFile_folderTitle_fkey` FOREIGN KEY (`folderTitle`) REFERENCES `Folder`(`title`) ON DELETE SET NULL ON UPDATE CASCADE;
