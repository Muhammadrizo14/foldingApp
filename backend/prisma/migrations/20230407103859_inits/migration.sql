-- DropForeignKey
ALTER TABLE `UploadedFile` DROP FOREIGN KEY `UploadedFile_folderId_fkey`;

-- AlterTable
ALTER TABLE `UploadedFile` MODIFY `folderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UploadedFile` ADD CONSTRAINT `UploadedFile_folderId_fkey` FOREIGN KEY (`folderId`) REFERENCES `Folder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
