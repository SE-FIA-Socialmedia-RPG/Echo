/*
  Warnings:

  - You are about to drop the column `hash` on the `Image` table. All the data in the column will be lost.
  - Added the required column `originalFileHash` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "originalFileHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Image" ("createdAt", "id", "path", "updatedAt") SELECT "createdAt", "id", "path", "updatedAt" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_originalFileHash_key" ON "Image"("originalFileHash");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
