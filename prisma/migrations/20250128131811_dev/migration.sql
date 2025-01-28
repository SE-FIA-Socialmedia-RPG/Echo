/*
  Warnings:

  - Added the required column `communityId` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Award" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "awardImageId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    CONSTRAINT "Award_awardImageId_fkey" FOREIGN KEY ("awardImageId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Award_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Award" ("awardImageId", "id", "name") SELECT "awardImageId", "id", "name" FROM "Award";
DROP TABLE "Award";
ALTER TABLE "new_Award" RENAME TO "Award";
CREATE INDEX "Award_awardImageId_idx" ON "Award"("awardImageId");
CREATE INDEX "Award_communityId_idx" ON "Award"("communityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
