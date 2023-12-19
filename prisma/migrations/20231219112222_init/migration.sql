/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- AlterSequence
ALTER SEQUENCE "Class_class_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Payment_payment_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age";
ALTER TABLE "User" ADD COLUMN     "dateOfBirth" TIMESTAMP(3);
