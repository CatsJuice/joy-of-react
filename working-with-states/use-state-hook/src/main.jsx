import { useState } from "react";
import ReactDOM from "react-dom/client";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Counter />
    <Counter />
  </>
);
