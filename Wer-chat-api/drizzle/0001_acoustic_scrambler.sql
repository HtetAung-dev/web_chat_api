ALTER TABLE "message" RENAME COLUMN "name" TO "room_id";--> statement-breakpoint
ALTER TABLE "message" RENAME COLUMN "flags" TO "isEdited";--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "isDeleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "isPinned" boolean DEFAULT false NOT NULL;