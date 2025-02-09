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
    CONSTRAINT "Award_awardImageId_fkey" FOREIGN KEY ("awardImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Award_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Award_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Award" ("adminUserId", "awardImageId", "awardName", "communityId", "createdAt", "id", "updatedAt") SELECT "adminUserId", "awardImageId", "awardName", "communityId", "createdAt", "id", "updatedAt" FROM "Award";
DROP TABLE "Award";
ALTER TABLE "new_Award" RENAME TO "Award";
CREATE INDEX "Award_awardImageId_adminUserId_communityId_idx" ON "Award"("awardImageId", "adminUserId", "communityId");
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("createdAt", "id", "postId", "text", "updatedAt", "userId") SELECT "createdAt", "id", "postId", "text", "updatedAt", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE INDEX "Comment_userId_postId_idx" ON "Comment"("userId", "postId");
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "communityName" TEXT NOT NULL,
    "profileImageId" INTEGER,
    "backgroundImageId" INTEGER,
    "bannerImageId" INTEGER,
    "adminUserId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Community_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Community_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Community_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Community_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Community" ("adminUserId", "backgroundImageId", "bannerImageId", "communityName", "createdAt", "id", "profileImageId", "updatedAt") SELECT "adminUserId", "backgroundImageId", "bannerImageId", "communityName", "createdAt", "id", "profileImageId", "updatedAt" FROM "Community";
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
CREATE UNIQUE INDEX "Community_communityName_key" ON "Community"("communityName");
CREATE INDEX "Community_profileImageId_backgroundImageId_bannerImageId_adminUserId_idx" ON "Community"("profileImageId", "backgroundImageId", "bannerImageId", "adminUserId");
CREATE TABLE "new_Login" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Login" ("createdAt", "id", "key", "updatedAt", "userId") SELECT "createdAt", "id", "key", "updatedAt", "userId" FROM "Login";
DROP TABLE "Login";
ALTER TABLE "new_Login" RENAME TO "Login";
CREATE UNIQUE INDEX "Login_key_key" ON "Login"("key");
CREATE INDEX "Login_userId_idx" ON "Login"("userId");
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "imageId" INTEGER,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("communityId", "createdAt", "id", "imageId", "text", "title", "updatedAt", "userId") SELECT "communityId", "createdAt", "id", "imageId", "text", "title", "updatedAt", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE INDEX "Post_imageId_userId_communityId_idx" ON "Post"("imageId", "userId", "communityId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "profileImageId" INTEGER,
    "backgroundImageId" INTEGER,
    "bannerImageId" INTEGER,
    "accentColor" TEXT NOT NULL DEFAULT 'green',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "User_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("accentColor", "backgroundImageId", "bannerImageId", "bio", "createdAt", "email", "id", "password", "profileImageId", "updatedAt", "username", "xp") SELECT "accentColor", "backgroundImageId", "bannerImageId", "bio", "createdAt", "email", "id", "password", "profileImageId", "updatedAt", "username", "xp" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_profileImageId_backgroundImageId_bannerImageId_idx" ON "User"("profileImageId", "backgroundImageId", "bannerImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
