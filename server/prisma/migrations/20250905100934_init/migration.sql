/*
  Warnings:

  - You are about to drop the column `status` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "status",
ADD COLUMN     "st" TEXT NOT NULL DEFAULT 'A';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "status",
ADD COLUMN     "st" TEXT NOT NULL DEFAULT 'A';

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "status",
ADD COLUMN     "st" TEXT NOT NULL DEFAULT 'A';
