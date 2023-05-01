import Key from "./Key";

const layout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

function Keyboard({ onKeyPressed }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {layout.map((row, rowNo) => {
        return (
          <div key={rowNo} className="flex items-center justify-center gap-1">
            {row.map((char) => {
              return (
                <Key
                  key={char}
                  char={char}
                  onPressed={() =>
                    onKeyPressed && onKeyPressed(char.toUpperCase())
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
export default Keyboard;
