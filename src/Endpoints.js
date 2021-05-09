const HOST = process.env.REACT_APP_HASURA_HOST || window?.location?.origin||'';
// if(process.env.NODE_ENV === 'production'){
// }

let wsUrl;
if (HOST.startsWith("https")) {
  wsUrl = "wss" + HOST.slice(5, HOST.length);
} else if (HOST.startsWith("http")) {
  wsUrl = "ws" + HOST.slice(4, HOST.length);
}

const ENDPOINTS = {
  HOST: HOST,
  GQL_URL: HOST + "/v1/graphql",
  GQL_WS_URL: wsUrl + "/v1/graphql",
  METADATA: HOST + "/v1/metadata",
  V2Query: HOST + "/v2/query",
  wsUrl,
};
export default ENDPOINTS;
