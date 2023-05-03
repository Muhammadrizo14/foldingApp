-- CreateTable
CREATE TABLE "Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "hide" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fieldname" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "folderTitle" TEXT,
    CONSTRAINT "UploadedFile_folderTitle_fkey" FOREIGN KEY ("folderTitle") REFERENCES "Folder" ("title") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_title_key" ON "Folder"("title");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedFile_filename_key" ON "UploadedFile"("filename");
