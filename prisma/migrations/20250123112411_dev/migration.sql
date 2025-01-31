/*
  Warnings:

  - You are about to drop the `Benutzer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Komentar` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Community` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `AdminBenutzerId` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `Bannerbild` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `Hintergrundbild` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `Namen` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `Profilbild` on the `Community` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BenutzerId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Bild` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `CommunityId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Likes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Text` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Tietel` on the `Post` table. All the data in the column will be lost.
  - Added the required column `adminUserId` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundImage` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerPicture` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communityId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Benutzer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Komentar";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "bannerPicture" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Community" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "bannerPicture" TEXT NOT NULL,
    "adminUserId" INTEGER NOT NULL,
    CONSTRAINT "Community_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Community";
ALTER TABLE "new_Community" RENAME TO "Community";
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
