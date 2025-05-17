/*
  Warnings:

  - The primary key for the `Bookmark` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `in` on the `Bookmark` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `in` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_pkey",
DROP COLUMN "in",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "in",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
