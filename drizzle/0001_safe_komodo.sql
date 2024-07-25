ALTER TABLE "synapse_clients" ADD COLUMN "organization_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "synapse_clients" ADD CONSTRAINT "synapse_clients_organization_id_synapse_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."synapse_organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
