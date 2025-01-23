/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `BenutzerId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Bild` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CommunityId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Likes` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Text` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tietel` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Benutzer" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Benutzername" TEXT NOT NULL,
    "EMail" TEXT NOT NULL,
    "Passwort" TEXT NOT NULL,
    "Xp" INTEGER NOT NULL,
    "Profilbild" TEXT NOT NULL,
    "Bannerbild" TEXT NOT NULL,
    "Hintergrundbild" TEXT NOT NULL,
    "Akzentfarbe" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Komentar" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Text" TEXT NOT NULL,
    "BenutzerId" INTEGER NOT NULL,
    "PostId" INTEGER NOT NULL,
    CONSTRAINT "Komentar_BenutzerId_fkey" FOREIGN KEY ("BenutzerId") REFERENCES "Benutzer" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Komentar_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Post" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Community" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Namen" TEXT NOT NULL,
    "Profilbild" TEXT NOT NULL,
    "Hintergrundbild" TEXT NOT NULL,
    "Bannerbild" TEXT NOT NULL,
    "AdminBenutzerId" INTEGER NOT NULL,
    CONSTRAINT "Community_AdminBenutzerId_fkey" FOREIGN KEY ("AdminBenutzerId") REFERENCES "Benutzer" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Tietel" TEXT NOT NULL,
    "Text" TEXT NOT NULL,
    "Bild" INTEGER NOT NULL,
    "Likes" INTEGER NOT NULL,
    "BenutzerId" INTEGER NOT NULL,
    "CommunityId" INTEGER NOT NULL,
    CONSTRAINT "Post_BenutzerId_fkey" FOREIGN KEY ("BenutzerId") REFERENCES "Benutzer" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_CommunityId_fkey" FOREIGN KEY ("CommunityId") REFERENCES "Community" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
