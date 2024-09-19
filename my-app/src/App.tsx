import React, { useState } from "react";
import { ChessPiece } from "./components/ChessPiece.tsx";
import { initialPieceState, generateBoard } from "./other/initialStates.tsx";
import { normalMoveSets } from "./other/moves.tsx";

export type Position = {
  x: number;
  y: number;
};

export type Piece = {
  position: Position;
  color: string;
  type: string;
  hasNotMoved?: boolean;
  isImprisoned?: boolean;
};

type Move = {
  x: number;
  y: number;
  isEnemy?: boolean;
};

export default function App() {
  const [gameState, setGameState] =
    useState<(Piece | undefined)[][]>(initialPieceState);
  const [moves, setMoves] = useState<Move[]>([]);

  function handlePieceClick(
    position: Position,
    color: string,
    type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn",
    hasNotMoved?: boolean,
    isImprisoned?: boolean
  ) {
    const relativeMoves = [];
    for (const directionalMoveSet of normalMoveSets[type]) {
      for (const move of directionalMoveSet) {
        relativeMoves.push(move);
      }
    }
    const absoluteMoves = relativeMoves.map((move) => {
      return {
        x: position.x + move.x,
        y: position.y + (color === "white" ? move.y : -move.y),
      };
    });
    const movesOnBoard = absoluteMoves.filter(
      (move) => move.x >= 0 && move.x <= 7 && move.y >= 0 && move.y <= 7
    );
    setMoves(
      movesOnBoard.map((move) => {
        return { x: move.x, y: move.y };
      })
    );
  }

  const board = generateBoard();
  for (const move of moves) {
    board[move.y][move.x] = !move.isEnemy
      ? (move.y + move.x) % 2 === 0
        ? "bg-[#8EF081]"
        : "bg-[#0A7417]"
      : (move.y + move.x) % 2 === 0
      ? "bg-[#F48A81]"
      : "bg-[#700E17]";
  }

  return (
    <div className="flex">
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
      <div className="relative w-[280px] md:w-[600px] h-[280px] md:h-[600px]">
        {board.map((row) => (
          <div className="flex">
            {row.map((s) => (
              <div
                className={`w-[35px] md:w-[75px] h-[35px] md:h-[75px] ${s}`}
              ></div>
            ))}
          </div>
        ))}
        {gameState.map((row) =>
          row.map((p) =>
            p === undefined ? undefined : (
              <ChessPiece pStats={p} onPieceClick={handlePieceClick} />
            )
          )
        )}
      </div>
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
    </div>
  );
}
