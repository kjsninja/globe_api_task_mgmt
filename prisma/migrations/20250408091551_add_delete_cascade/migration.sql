-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_owner_fkey";

-- DropForeignKey
ALTER TABLE "UserSession" DROP CONSTRAINT "UserSession_owner_fkey";

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
