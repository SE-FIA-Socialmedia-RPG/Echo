-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT 'Hallo ich bin auf Echo!',
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
INSERT INTO "new_User" ("accentColor", "backgroundImageId", "bannerImageId", "bio", "createdAt", "email", "id", "password", "profileImageId", "streak", "updatedAt", "username", "xp") SELECT "accentColor", "backgroundImageId", "bannerImageId", coalesce("bio", 'Hallo ich bin auf Echo!') AS "bio", "createdAt", "email", "id", "password", "profileImageId", "streak", "updatedAt", "username", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_profileImageId_backgroundImageId_bannerImageId_idx" ON "User"("profileImageId", "backgroundImageId", "bannerImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
