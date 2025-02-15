/*
  Warnings:

  - You are about to drop the column `name` on the `Community` table. All the data in the column will be lost.
  - Added the required column `adminUserId` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communityName` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Award" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "awardName" TEXT NOT NULL,
    "awardImageId" INTEGER,
    "adminUserId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Award_awardImageId_fkey" FOREIGN KEY ("awardImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Award_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Award_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Award" ("awardImageId", "awardName", "communityId", "createdAt", "id", "updatedAt") SELECT "awardImageId", "awardName", "communityId", "createdAt", "id", "updatedAt" FROM "Award";
DROP TABLE "Award";
ALTER TABLE "new_Award" RENAME TO "Award";
CREATE INDEX "Award_awardImageId_communityId_idx" ON "Award"("awardImageId", "communityId");
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "communityName" TEXT NOT NULL,
    "profileImageId" INTEGER,
    "backgroundImageId" INTEGER,
    "bannerImageId" INTEGER,
    "adminUserId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Community_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Community_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Community_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Community_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Community" ("adminUserId", "backgroundImageId", "bannerImageId", "createdAt", "id", "profileImageId", "updatedAt") SELECT "adminUserId", "backgroundImageId", "bannerImageId", "createdAt", "id", "profileImageId", "updatedAt" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
CREATE UNIQUE INDEX "Community_communityName_key" ON "Community"("communityName");
CREATE INDEX "Community_profileImageId_backgroundImageId_bannerImageId_adminUserId_idx" ON "Community"("profileImageId", "backgroundImageId", "bannerImageId", "adminUserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
