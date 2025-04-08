-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('0', '1');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT '0';
