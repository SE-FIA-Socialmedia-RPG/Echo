-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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
INSERT INTO "new_Community" ("adminUserId", "backgroundImageId", "bannerImageId", "createdAt", "id", "name", "profileImageId", "updatedAt") SELECT "adminUserId", "backgroundImageId", "bannerImageId", "createdAt", "id", "name", "profileImageId", "updatedAt" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");
CREATE INDEX "Community_profileImageId_idx" ON "Community"("profileImageId");
CREATE INDEX "Community_backgroundImageId_idx" ON "Community"("backgroundImageId");
CREATE INDEX "Community_bannerImageId_idx" ON "Community"("bannerImageId");
CREATE INDEX "Community_adminUserId_idx" ON "Community"("adminUserId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "profileImageId" INTEGER,
    "backgroundImageId" INTEGER,
    "bannerImageId" INTEGER,
    "accentColor" TEXT NOT NULL DEFAULT 'green',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("accentColor", "backgroundImageId", "bannerImageId", "createdAt", "email", "id", "password", "profileImageId", "updatedAt", "username", "xp") SELECT "accentColor", "backgroundImageId", "bannerImageId", "createdAt", "email", "id", "password", "profileImageId", "updatedAt", "username", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_profileImageId_idx" ON "User"("profileImageId");
CREATE INDEX "User_backgroundImageId_idx" ON "User"("backgroundImageId");
CREATE INDEX "User_bannerImageId_idx" ON "User"("bannerImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
