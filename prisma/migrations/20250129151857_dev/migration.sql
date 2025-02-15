-- DropIndex
DROP INDEX "Login_key_key";

-- DropIndex
DROP INDEX "User_bannerImageId_idx";

-- DropIndex
DROP INDEX "User_backgroundImageId_idx";

-- DropIndex
DROP INDEX "User_profileImageId_idx";

-- CreateTable
CREATE TABLE "Follower" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "_UserFollowing" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserFollowing_A_fkey" FOREIGN KEY ("A") REFERENCES "Follower" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFollowing_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserFollowers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Follower" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowing_AB_unique" ON "_UserFollowing"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowing_B_index" ON "_UserFollowing"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowers_AB_unique" ON "_UserFollowers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowers_B_index" ON "_UserFollowers"("B");

-- CreateIndex
CREATE INDEX "Login_userId_idx" ON "Login"("userId");

-- CreateIndex
CREATE INDEX "User_profileImageId_backgroundImageId_bannerImageId_idx" ON "User"("profileImageId", "backgroundImageId", "bannerImageId");
