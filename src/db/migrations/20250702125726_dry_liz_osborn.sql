CREATE TABLE "boilerlaunch_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"short_description" text NOT NULL,
	"image_url" text NOT NULL,
	"project_url" text NOT NULL,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"slug" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "boilerlaunch_products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "boilerlaunch_upvotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "boilerlaunch_upvotes" ADD CONSTRAINT "boilerlaunch_upvotes_product_id_boilerlaunch_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."boilerlaunch_products"("id") ON DELETE cascade ON UPDATE no action;