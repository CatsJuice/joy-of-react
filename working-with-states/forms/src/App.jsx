import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const selections = [
    { id: 1, name: "one" },
    { id: 2, name: "two" },
    { id: 3, name: "three" },
  ];
  const [selected, setSelected] = useState(selections[0]);
  const [sgSelected, setSgSelected] = useState(selections[0].id);

  return (
    <>
      <form>
        <label htmlFor="input">
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
      </form>

      <form name="select">
        <label htmlFor="select">
          <select
            id="select"
            value={selected.id}
            onChange={(e) =>
              setSelected(selections.find((s) => s.id === +e.target.value))
            }
          >
            {selections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </form>

      <form name="select-group">
        {selections.map((s) => (
          <label key={s.id} htmlFor={`select-group-${s.id}`}>
            <input
              id={`select-group-${s.id}`}
              type="radio"
              name="select-group"
              value={s.id}
              checked={sgSelected === s.id}
              onChange={(e) => setSgSelected(+e.target.value)}
            />
            {s.name}
          </label>
        ))}
      </form>


      <div>
        <p>Input: {input}</p>
        <p>Selected: {selected.name}</p>
        <p>Selected: {sgSelected}</p>
      </div>
    </>
  );
}

export default App;
