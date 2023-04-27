const statusColors = [
  // 0: no status
  "transparent",
  // 1: correct
  "#27AE60",
  // 2: hit but wrong position
  "#F39C12",
  // 3: wrong
  "#808B96",
];

export function Cell({ char, status = 0 }) {
  const backgroundColor = statusColors[status] || "transparent";

  return (
    <div
      style={{ backgroundColor }}
      className="outline outline-2 outline-slate-100 w-12 h-12 flex justify-center items-center rounded-lg font-bold"
    >
      {char || ""}
    </div>
  );
}

export default Cell;
