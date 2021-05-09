const fetchMetadata = async () => {
  try {
    const metadataResp = await fetch("http://localhost:8080/v1/metadata", {
      body: '{"type":"export_metadata","version":2,"args":{}}',
      method: "POST",
    });

    const metadataObj = await metadataResp.json();
    return metadataObj;
  } catch (error) {
    return { error: true };
  }
};
export const initServer = async () => {
  try {
    await fetch("http://localhost:8080/v1/metadata", {
      body: '{"type":"clear_metadata","args":{}}',
      method: "POST",
    });

    await fetch("http://localhost:8080/v2/query", {
      body:
        '{"type":"bulk","source":"default","resource_version":82,"args":[{"type":"run_sql","args":{"source":"default","sql":"CREATE TABLE \\"public\\".\\"todos\\" (\\"id\\" serial NOT NULL, \\"todo\\" text NOT NULL, \\"status\\" text NOT NULL, \\"percentage\\" numeric NOT NULL, \\"created_at\\" timestamptz NOT NULL DEFAULT now(), \\"updated_at\\" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (\\"id\\") );\\nCREATE OR REPLACE FUNCTION \\"public\\".\\"set_current_timestamp_updated_at\\"()\\nRETURNS TRIGGER AS $$\\nDECLARE\\n  _new record;\\nBEGIN\\n  _new := NEW;\\n  _new.\\"updated_at\\" = NOW();\\n  RETURN _new;\\nEND;\\n$$ LANGUAGE plpgsql;\\nCREATE TRIGGER \\"set_public_todos_updated_at\\"\\nBEFORE UPDATE ON \\"public\\".\\"todos\\"\\nFOR EACH ROW\\nEXECUTE PROCEDURE \\"public\\".\\"set_current_timestamp_updated_at\\"();\\nCOMMENT ON TRIGGER \\"set_public_todos_updated_at\\" ON \\"public\\".\\"todos\\" \\nIS \'trigger to set value of column \\"updated_at\\" to current timestamp on row update\';","cascade":false,"read_only":false}}]}',
      method: "POST",
    });
    let metadataObj = await fetchMetadata();
    const resp = await fetch("http://localhost:8080/v1/metadata", {
      body: JSON.stringify({
        type: "bulk",
        source: "default",
        resource_version: metadataObj?.resource_version,
        args: [
          {
            type: "pg_track_table",
            args: {
              table: { schema: "public", name: "todos" },
              source: "default",
            },
          },
        ],
      }),
      method: "POST",
    });
    const res = await resp.json();
    return res?.[0];
  } catch (error) {
    return { error: true, details: error };
  }
};
