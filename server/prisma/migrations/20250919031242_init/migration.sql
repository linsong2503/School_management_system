/*
  Warnings:

  - You are about to drop the column `status` on the `Admin` table. All the data in the column will be lost.
  - Added the required column `st` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "status",
ADD COLUMN     "st" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Parent" ALTER COLUMN "st" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "st" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "st" DROP DEFAULT;
