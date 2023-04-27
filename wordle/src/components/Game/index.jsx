import { useState } from "react";
import { useEffect } from "react";

import Cell from "./Cell";
import wordDictionary from "./dictonary.json";

const chances = 5;
const wordLength = 5;
const correct =
  wordDictionary[Math.floor(Math.random() * wordDictionary.length)].split("");

console.log(`correct word is ${correct.join("")}`);
const allowedChars = "qwertyuiopasdfghjklzxcvbnm";

const range = (num) => new Array(num).fill(1).map((_, i) => i);

// let cursor = [0, 0];

function Game() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [answer, setAnswer] = useState(
    range(chances).map((_) =>
      range(wordLength).map((_) => ({
        val: "",
        status: 0,
      }))
    )
  );

  useEffect(() => {
    const handler = (e) => {
      console.log("key pressed", e.key);
      e.preventDefault();
      const isEnter = e.key === "Enter";
      const isBackspace = e.key === "Backspace";
      const isAllowedChars = allowedChars.includes(e.key.toLowerCase());
      if (!isEnter && !isBackspace && isAllowedChars) {
        const { x, y } = cursor;
        if (x >= wordLength.length - 1) return;
        setAnswer((prevAnswer) => {
          const nextAnswer = [...prevAnswer.map((row) => [...row])];
          nextAnswer[y][x] = { val: e.key.toUpperCase(), status: 0 };
          return nextAnswer;
        });
        setCursor((cursor) => ({ x: cursor.x + 1, y: cursor.y }));
        return;
      }
      if (isBackspace) {
        const { x, y } = cursor;
        if (x <= 0) return;
        setAnswer((prevAnswer) => {
          const nextAnswer = [...prevAnswer.map((row) => [...row])];
          nextAnswer[y][x] = { val: "", status: 0 };
          return nextAnswer;
        });
        setCursor({ x: cursor.x - 1, y: cursor.y });
        return;
      }
      if (isEnter && cursor[1] >= wordLength - 1) {
        const guess = answer[cursor[0]].join("");
        const isExits = wordDictionary.includes(guess);
        const win = guess === correct.join("");
        setAnswer((prevAnswer) => {
          const newAnswer = [...prevAnswer];
          const currentRow = newAnswer[cursor[0]].map((cell, i) => {
            if (cell.val === correct[i]) {
              return { ...cell, status: 1 };
            } else if (correct.includes(cell.val)) {
              return { ...cell, status: 2 };
            } else {
              return { ...cell, status: 3 };
            }
          });
          newAnswer[cursor[0]] = currentRow;
          return newAnswer;
        });
        cursor[0] = cursor[0] + 1;
        cursor[1] = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {range(chances).map((row) =>
          range(wordLength).map((col) => (
            <Cell
              key={col}
              char={answer[row][col].val}
              status={answer[row][col].status}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Game;
