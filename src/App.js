import React from "react";

import "./App.css";
import MainContainer from "./components/MainContainer";

function App() {
  React.useEffect(() => {
    const className = document.getElementById("content").className;
    document.getElementById("content").className = className + " show";
    document.getElementById("loading").style.display = "none";
  }, []);
  return (
    <div className="App">
      <MainContainer />
    </div>
  );
}

export default App;
