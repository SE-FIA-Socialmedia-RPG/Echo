/*
  Warnings:

  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFollowers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFollowing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Award_communityId_idx";

-- DropIndex
DROP INDEX "Award_awardImageId_idx";

-- DropIndex
DROP INDEX "Comment_postId_idx";

-- DropIndex
DROP INDEX "Comment_userId_idx";

-- DropIndex
DROP INDEX "Community_adminUserId_idx";

-- DropIndex
DROP INDEX "Community_bannerImageId_idx";

-- DropIndex
DROP INDEX "Community_backgroundImageId_idx";

-- DropIndex
DROP INDEX "Community_profileImageId_idx";

-- DropIndex
DROP INDEX "Post_communityId_idx";

-- DropIndex
DROP INDEX "Post_userId_idx";

-- DropIndex
DROP INDEX "Post_imageId_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Follower";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserFollowers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserFollowing";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- CreateIndex
CREATE INDEX "Award_awardImageId_communityId_idx" ON "Award"("awardImageId", "communityId");

-- CreateIndex
CREATE INDEX "Comment_userId_postId_idx" ON "Comment"("userId", "postId");

-- CreateIndex
CREATE INDEX "Community_profileImageId_backgroundImageId_bannerImageId_adminUserId_idx" ON "Community"("profileImageId", "backgroundImageId", "bannerImageId", "adminUserId");

-- CreateIndex
CREATE INDEX "Post_imageId_userId_communityId_idx" ON "Post"("imageId", "userId", "communityId");
