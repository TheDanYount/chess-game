import { useState } from "react";
import { Tile } from "./components/Tile.tsx";
import {
  initialTileStats,
  tileBackgroundReset,
} from "./other/initialState.tsx";
import { getMoves } from "./other/moves.tsx";

export type PieceStats = {
  color: string;
  type: string;
  hasMoved?: boolean;
};

export type TileStats = {
  bgColor: string;
  pieceStats?: PieceStats;
};

export type Move = {
  x: number;
  y: number;
  isEnemy: boolean;
};

export default function App() {
  const [gameState, setGameState] = useState<TileStats[][]>(initialTileStats);
  const [potentialMoves, setPotentialMoves] = useState<Move[]>([]);
  //const [prisons, setPrisons] = useState<PieceStats[][]>();
  const [isWhitesTurn, setIsWhitesTurn] = useState(true);
  const [currentPiece, setCurrentPiece] = useState<{
    y: number;
    x: number;
    pieceStats: PieceStats;
  }>();
  const [potentialEnPassant, setPotentialEnPassant] = useState<{
    y: number;
    x: number;
    pieceStats: PieceStats;
  }>();

  function handlePieceClick(
    y: number,
    x: number,
    color?: string,
    type?: string,
    hasMoved?: boolean
  ) {
    if (
      (color === "white" && isWhitesTurn) ||
      (color === "black" && !isWhitesTurn)
    ) {
      const convertedType = type as string;
      //Note that making the following a state setter would make later code redundant
      tileBackgroundReset(gameState);
      const currentMoves = getMoves(
        gameState,
        y,
        x,
        color as string,
        type as string,
        !hasMoved ? false : true,
        potentialEnPassant
      );
      setPotentialMoves(currentMoves);
      setCurrentPiece({
        y,
        x,
        pieceStats: { color, type: convertedType, hasMoved },
      });
      for (const move of currentMoves) {
        const formerBgColor = gameState[move.y][move.x].bgColor;
        gameState[move.y][move.x].bgColor =
          formerBgColor === "bg-[#EEE7D8]"
            ? move.isEnemy
              ? "bg-[#F48A81]"
              : "bg-[#8EF081]"
            : move.isEnemy
            ? "bg-[#700E17]"
            : "bg-[#0A7417]";
      }
      setGameState(gameState.slice());
    } else if (potentialMoves.find((e) => e.y === y && e.x === x)) {
      handleMove(y, x);
    }
  }

  function handleMove(y: number, x: number) {
    if (!currentPiece) return;
    if (!currentPiece.pieceStats.hasMoved)
      currentPiece.pieceStats.hasMoved = true;
    // Remove the piece that's leaving
    gameState[currentPiece.y][currentPiece.x].pieceStats = undefined;
    // Removal for en passant
    if (
      currentPiece.pieceStats.type === "pawn" &&
      gameState[y][x].pieceStats === undefined &&
      currentPiece.x !== x
    ) {
      gameState[currentPiece.y][x].pieceStats = undefined;
    }
    // Castling rook behavior
    if (currentPiece.pieceStats.type === "king") {
      //Queen side castle
      if (currentPiece.x - x === 2) {
        gameState[y][3].pieceStats = gameState[y][0].pieceStats as PieceStats;
        gameState[y][3].pieceStats.hasMoved = true;
        gameState[y][0].pieceStats = undefined;
      } /* King side castle */ else if (currentPiece.x - x === -2) {
        gameState[y][5].pieceStats = gameState[y][7].pieceStats as PieceStats;
        gameState[y][5].pieceStats.hasMoved = true;
        gameState[y][7].pieceStats = undefined;
      }
    }
    // Move the currentPiece to the new spot
    gameState[y][x].pieceStats = currentPiece.pieceStats;
    if (potentialEnPassant) setPotentialEnPassant(undefined);
    // Check to add potential en passant
    if (
      currentPiece.pieceStats.type === "pawn" &&
      Math.abs(currentPiece.y - y) === 2
    ) {
      setPotentialEnPassant({ y, x, pieceStats: currentPiece.pieceStats });
    }
    setCurrentPiece(undefined);
    setIsWhitesTurn(!isWhitesTurn);
    setPotentialMoves([]);
    tileBackgroundReset(gameState);
    setGameState(gameState);
  }

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
                  onTileClick={handlePieceClick}
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
