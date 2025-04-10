-- CreateIndex
CREATE INDEX "Task_updatedAt_idx" ON "Task"("updatedAt" DESC);

-- CreateIndex
CREATE INDEX "UserSession_createdAt_idx" ON "UserSession"("createdAt" DESC);
