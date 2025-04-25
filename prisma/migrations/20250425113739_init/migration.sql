/*
  Warnings:

  - You are about to drop the column `rank` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "rank",
DROP COLUMN "reason";
