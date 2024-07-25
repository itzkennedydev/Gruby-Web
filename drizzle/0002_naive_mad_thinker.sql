ALTER TABLE "synapse_clients" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_clients" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_clients" ALTER COLUMN "organization_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_contracts" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_contracts" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_contracts" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_file_channels" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_file_channels" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_file_channels" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_file_channels" ALTER COLUMN "project_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_files" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_files" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_files" ALTER COLUMN "channel_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_files" ALTER COLUMN "uploaded_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_form_submissions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_form_submissions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_form_submissions" ALTER COLUMN "form_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_form_submissions" ALTER COLUMN "submitted_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_forms" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_forms" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_forms" ALTER COLUMN "created_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_invoices" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_invoices" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_invoices" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_messages" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_messages" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_messages" ALTER COLUMN "sender_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_messages" ALTER COLUMN "recipient_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_notifications" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_notifications" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_notifications" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_organizations" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_organizations" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_projects" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_projects" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_projects" ALTER COLUMN "client_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_user_permissions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_user_permissions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_user_permissions" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_users" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "synapse_users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "synapse_users" ALTER COLUMN "organization_id" SET DATA TYPE text;