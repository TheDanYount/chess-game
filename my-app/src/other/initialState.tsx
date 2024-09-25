import { TileStats } from "../App.tsx";

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

function generateInitialTiles() {
  const rows = [];
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      const tileStats: TileStats = {
        bgColor: (x + y) % 2 === 0 ? "bg-[#EEE7D8]" : "bg-[#111827]",
      };
      if (y < 2 || y > 5)
        tileStats.pieceStats = {
          color: y < 2 ? "black" : "white",
          type: y === 1 || y === 6 ? "pawn" : types[x],
        };
      row.push(tileStats);
    }
    rows.push(row);
  }
  return rows;
}

export const initialTileStats = generateInitialTiles();
