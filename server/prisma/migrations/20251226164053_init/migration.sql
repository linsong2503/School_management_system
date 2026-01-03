/*
  Warnings:

  - You are about to drop the column `password` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Parent_password_key";

-- DropIndex
DROP INDEX "Parent_username_key";

-- DropIndex
DROP INDEX "Student_password_key";

-- DropIndex
DROP INDEX "Student_username_key";

-- DropIndex
DROP INDEX "Teacher_password_key";

-- DropIndex
DROP INDEX "Teacher_username_key";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "username";

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "st" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");
