CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"people_id" integer NOT NULL,
	"description" text DEFAULT 'No description' NOT NULL,
	"deliver_time" timestamp with time zone,
	"done" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "peoples" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"role_id" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'User' NOT NULL,
	"have_access" boolean DEFAULT false NOT NULL,
	"have_full_access" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_people_id_peoples_id_fk" FOREIGN KEY ("people_id") REFERENCES "public"."peoples"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "peoples" ADD CONSTRAINT "peoples_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE set default ON UPDATE no action;