-- CreateTable
CREATE TABLE "sms_messages" (
    "id" BIGSERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "date" BIGINT NOT NULL,
    "type" INTEGER NOT NULL,
    "thread_id" TEXT NOT NULL,
    "read" INTEGER NOT NULL,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sms_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "call_entries" (
    "id" BIGSERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "date" BIGINT NOT NULL,
    "type" INTEGER NOT NULL,
    "name" TEXT,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "call_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" BIGSERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "pkg" TEXT NOT NULL,
    "title" TEXT,
    "text" TEXT,
    "timestamp" BIGINT NOT NULL,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sms_source_external_id_unique" ON "sms_messages"("source", "external_id");

-- CreateIndex
CREATE UNIQUE INDEX "call_source_external_id_unique" ON "call_entries"("source", "external_id");

-- CreateIndex
CREATE UNIQUE INDEX "notification_source_external_id_unique" ON "notifications"("source", "external_id");
