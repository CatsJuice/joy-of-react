import { useState } from "react";
import { useEffect } from "react";

import Cell from "./Cell";
import wordDictionary from "./dictionary.json";
import Keyboard from "./Keyboard";

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
    range(chances).map(() =>
      range(wordLength).map(() => ({
        val: "",
        status: 0,
      }))
    )
  );
  const [activeKeys, setActiveKeys] = useState([]);
  // console.log("render Game, cursor: ", cursor.x, cursor.y);
  const keydownHandler = (e) => {
    console.log("key pressed", e.key);
    e.preventDefault && e.preventDefault();
    const isEnter = e.key === "Enter";
    const isBackspace = e.key === "Backspace";
    const isAllowedChars = allowedChars.includes(e.key.toLowerCase());
    const { x, y } = cursor;

    if (!isEnter && !isBackspace && isAllowedChars) {
      if (x >= wordLength) return;
      setAnswer((prevAnswer) => {
        const nextAnswer = [...prevAnswer.map((row) => [...row])];
        nextAnswer[y][x] = { val: e.key.toUpperCase(), status: 0 };
        return nextAnswer;
      });
      setCursor({ x: x + 1, y });
      setActiveKeys((prevKeys) => [...prevKeys, e.key.toUpperCase()]);
      return;
    }
    if (isBackspace) {
      if (x <= 0) return;
      setCursor({ x: x - 1, y });
      setAnswer((prevAnswer) => {
        const nextAnswer = [...prevAnswer.map((row) => [...row])];
        nextAnswer[y][x - 1] = { val: "", status: 0 };
        return nextAnswer;
      });
      return;
    }
    if (isEnter && x === wordLength) {
      const guess = answer[y].map((obj) => obj.val).join("");
      const isExits = wordDictionary.includes(guess);
      const win = guess === correct.join("");
      setAnswer((prevAnswer) => {
        const newAnswer = [...prevAnswer];
        const currentRow = newAnswer[y].map((cell, i) => {
          if (cell.val === correct[i]) {
            return { ...cell, status: 1 };
          } else if (correct.includes(cell.val)) {
            return { ...cell, status: 2 };
          } else {
            return { ...cell, status: 3 };
          }
        });
        newAnswer[y] = currentRow;
        return newAnswer;
      });
      setCursor({ x: 0, y: y + 1 });
    }
  };
  const keyupHandler = (e) => {
    console.log("key pressed", e.key);
    e.preventDefault && e.preventDefault();
    const isAllowedChars = allowedChars.includes(e.key.toLowerCase());
    const key = e.key.toUpperCase();
    if (isAllowedChars) {
      setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [cursor, answer]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div>
        cursor: {cursor.x}, {cursor.y}
        <br />
        activeKeys: {activeKeys.join(",")}
      </div>
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
      <Keyboard
        onKeyPressed={(key) => keydownHandler({ key })}
        activeKeys={activeKeys}
      />
    </div>
  );
}

export default Game;
