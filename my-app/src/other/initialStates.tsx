function generatePieces() {
  const types = [
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",
  ];
  const pieces = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      if (i < 2 || i > 5) {
        row.push({
          position: { x: j, y: i },
          color: i < 2 ? "black" : "white",
          type: i === 1 || i === 6 ? "pawn" : types[j],
          hasNotMoved: true,
        });
      } else {
        row.push(undefined);
      }
    }
    pieces.push(row);
  }
  return pieces;
}

export function generateBoard() {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push((i + j) % 2 === 0 ? "bg-[#EEE7D8]" : "bg-[#111827]");
    }
    rows.push(row);
  }
  return rows;
}

export const initialPieceState = generatePieces();
