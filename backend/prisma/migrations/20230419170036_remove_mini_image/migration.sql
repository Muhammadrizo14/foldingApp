/*
  Warnings:

  - You are about to drop the column `nameMini` on the `UploadedFile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `UploadedFile_nameMini_key` ON `UploadedFile`;

-- AlterTable
ALTER TABLE `UploadedFile` DROP COLUMN `nameMini`;
