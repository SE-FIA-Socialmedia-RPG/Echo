/*
  Warnings:

  - Made the column `awardImageId` on table `Award` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backgroundImageId` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bannerImageId` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImageId` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `backgroundImageId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bannerImageId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImageId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Award" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "awardName" TEXT NOT NULL,
    "awardImageId" INTEGER NOT NULL,
    "adminUserId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Award_awardImageId_fkey" FOREIGN KEY ("awardImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Award_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Award_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Award" ("adminUserId", "awardImageId", "awardName", "communityId", "createdAt", "id", "updatedAt") SELECT "adminUserId", "awardImageId", "awardName", "communityId", "createdAt", "id", "updatedAt" FROM "Award";
DROP TABLE "Award";
ALTER TABLE "new_Award" RENAME TO "Award";
CREATE INDEX "Award_awardImageId_adminUserId_communityId_idx" ON "Award"("awardImageId", "adminUserId", "communityId");
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "communityName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileImageId" INTEGER NOT NULL,
    "backgroundImageId" INTEGER NOT NULL,
    "bannerImageId" INTEGER NOT NULL,
    "adminUserId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Community_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Community_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Community_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Community_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Community" ("adminUserId", "backgroundImageId", "bannerImageId", "communityName", "createdAt", "description", "id", "profileImageId", "updatedAt") SELECT "adminUserId", "backgroundImageId", "bannerImageId", "communityName", "createdAt", "description", "id", "profileImageId", "updatedAt" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
CREATE INDEX "Community_profileImageId_backgroundImageId_bannerImageId_adminUserId_idx" ON "Community"("profileImageId", "backgroundImageId", "bannerImageId", "adminUserId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "streak" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileImageId" INTEGER NOT NULL,
    "backgroundImageId" INTEGER NOT NULL,
    "bannerImageId" INTEGER NOT NULL,
    "accentColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("accentColor", "backgroundImageId", "bannerImageId", "bio", "createdAt", "email", "id", "password", "profileImageId", "streak", "updatedAt", "username", "xp") SELECT "accentColor", "backgroundImageId", "bannerImageId", "bio", "createdAt", "email", "id", "password", "profileImageId", "streak", "updatedAt", "username", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_profileImageId_backgroundImageId_bannerImageId_idx" ON "User"("profileImageId", "backgroundImageId", "bannerImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
