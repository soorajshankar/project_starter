import React, { useReducer } from "react";

import "./App.css";
import MainContainer from "./components/MainContainer";
import ErrorPage from "./components/ErrorPage";
import { reducer, initialState } from "./actions/state";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  React.useEffect(() => {
    const className = document.getElementById("content").className;
    document.getElementById("content").className = className + " show";
    document.getElementById("loading").style.display = "none";
  }, []);
  return (
    <div className="App">
      {state?.errors ? (
        <ErrorPage dispatch={dispatch} />
      ) : (
        <MainContainer state={state} dispatch={dispatch} />
      )}
    </div>
  );
}

export default App;
