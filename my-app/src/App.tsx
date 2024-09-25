import { useState } from "react";
import { Tile } from "./components/Tile.tsx";
import { initialTileStats } from "./other/initialState.tsx";
import { normalMoveSets } from "./other/moves.tsx";
import { TbFileCertificate } from "react-icons/tb";

type Move = {
  x: number;
  y: number;
  isEnemy?: boolean;
};

type PieceStats = {
  color: string;
  type: string;
  hasMoved?: boolean;
  isImprisoned?: boolean;
};

export type TileStats = {
  bgColor: string;
  pieceStats?: PieceStats;
};

export default function App() {
  const [gameState, setGameState] = useState<TileStats[][]>(initialTileStats);
  const [prisons, setPrisons] = useState<PieceStats[][]>();

  function handleTileClick() {}

  let num = -1;
  return (
    <div className="flex">
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
      <div className="flex flex-col w-[280px] md:w-[600px] h-[280px] md:h-[600px]">
        {gameState.map((row) => (
          <div className="flex w-[280px] md:w-[600px] h-[35px] md:h-[75px]">
            {row.map((tileStats) => {
              num++;
              return (
                <Tile
                  y={Math.floor(num / 8)}
                  x={num % 8}
                  tileStats={tileStats}
                  onTileClick={handleTileClick}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
    </div>
  );
}
