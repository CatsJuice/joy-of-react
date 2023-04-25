// import React from "react";
import ReactDOM from "react-dom/client";

function onClick(e) {
  console.log("clicked", e);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <button onClick={onClick}>click me</button>
);
