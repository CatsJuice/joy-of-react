function Key({ char, onPressed }) {
  return (
    <div className="key" onClick={onPressed}>
      {char}
    </div>
  );
}

export default Key;
