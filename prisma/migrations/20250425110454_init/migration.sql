/*
  Warnings:

  - You are about to drop the `Con` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Con" DROP CONSTRAINT "Con_decisionId_fkey";

-- DropForeignKey
ALTER TABLE "Pro" DROP CONSTRAINT "Pro_decisionId_fkey";

-- DropTable
DROP TABLE "Con";

-- DropTable
DROP TABLE "Pro";
