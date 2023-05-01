function Key({ char, onPressed }) {
  return (
    <div
      className="group relative w-8 h-10 font-bold rounded cursor-pointer text-slate-800 overflow-hidden"
      onClick={onPressed}
    >
      <div className="absolute h-full w-full rounded bg-slate-300"></div>
      <div className="absolute h-full w-full rounded bg-slate-200 -translate-y-1 flex items-center justify-center group-active:translate-y-0 transition group-active:bg-slate-300">
        {char}
      </div>
    </div>
  );
}

export default Key;
