CREATE TABLE "public"."todos" ("id" serial NOT NULL, "desc" text NOT NULL, "completed" boolean NOT NULL DEFAULT false, "created_at" timestamptz NOT NULL DEFAULT now(), "eta" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_eta"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."eta" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_todos_eta"
BEFORE UPDATE ON "public"."todos"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_eta"();
COMMENT ON TRIGGER "set_public_todos_eta" ON "public"."todos" 
IS 'trigger to set value of column "eta" to current timestamp on row update';
