import React from "react";
import { initServer} from "../actions/actions";
import { SET_ERROR} from "../actions/state";

const ErrorPage = ({ dispatch }) => {
  return (
    <div>
      <h1>Looks like server is not setup correctly</h1>
      <button
        onClick={async () => {
          const resp = await initServer();
          console.log(resp);
          if (!resp?.error) {
            dispatch({ type: SET_ERROR, payload: false });
          }
        }}
      >
        Setup Server
      </button>
    </div>
  );
};

export default ErrorPage;
