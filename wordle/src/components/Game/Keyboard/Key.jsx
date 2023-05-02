import "./key.css";

function Key({ char, onPressed, active, invalid }) {
  return (
    <div
      className="key relative w-8 h-10 font-bold rounded cursor-pointer text-slate-800 overflow-hidden"
      onClick={onPressed}
    >
      <div
        className={(active ? "active" : "") + " " + (invalid ? "invalid" : "")}
      >
        <div className="absolute h-full w-full rounded bg-slate-300"></div>
        <div className="absolute h-full w-full rounded bg-slate-200 content -translate-y-1 flex items-center justify-center transition select-none uppercase">
          {char}
        </div>
      </div>
    </div>
  );
}

export default Key;
