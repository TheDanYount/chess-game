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
  type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
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
  const [potentailEnPassants, setPotentialEnPassants] = useState();

  function getSpecialMoves(
    position: Position,
    color: string,
    type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn",
    hasNotMoved?: boolean
  ) {
    const specialMoves = [];
    if (type === "pawn") {
      if (
        hasNotMoved &&
        color === "white" &&
        gameState[position.y - 1][position.x] === undefined
      ) {
        specialMoves.push({ x: position.x, y: position.y - 2 });
      } else if (
        hasNotMoved &&
        color === "black" &&
        gameState[position.y + 1][position.x] === undefined
      ) {
        specialMoves.push({ x: position.x, y: position.y + 2 });
      }
    } else if (type === "king") {
      console.log("nothing for kings yet");
    }
    return specialMoves;
  }

  function handlePieceClick(
    position: Position,
    color: string,
    type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn",
    hasNotMoved?: boolean,
    isImprisoned?: boolean
  ) {
    const relativeMoves = [];
    for (const directionalMoveSet of normalMoveSets[type]) {
      relativeMoves.push(directionalMoveSet);
    }
    const absoluteMoves = relativeMoves.map((directionalMoveSet) => {
      const newDMS = directionalMoveSet.map((move) => {
        return {
          x: position.x + move.x,
          y: position.y + (color === "white" ? move.y : -move.y),
        };
      });
      return newDMS;
    });
    console.log(absoluteMoves);
    const validMoveSets = absoluteMoves.map((directionalMoveSet) => {
      let blocked = false;
      const newDMS = directionalMoveSet.filter((move) => {
        if (
          !blocked &&
          move.y > -1 &&
          move.y < 8 && //row exists
          move.x > -1 &&
          move.x < 8 //column exists
        ) {
          if (
            gameState[move.y][move.x] === undefined || // empty space
            (gameState[move.y][move.x]?.color !== color && //enemy occupies potential move
              type !== "pawn")
          ) {
            return true;
          }
        }
        blocked = true;
        return false;
      });
      return newDMS;
    });
    const validMoves = [];
    for (const directionalMoveSet of validMoveSets) {
      for (const move of directionalMoveSet) {
        validMoves.push(
          gameState[move.y][move.x]
            ? { x: position.x, y: position.y, isEnemy: true }
            : move
        );
      }
    }
    const specialMoves: Move[] = getSpecialMoves(
      position,
      color,
      type,
      hasNotMoved
    );
    for (const move of specialMoves) {
      validMoves.push(move);
    }
    setMoves(
      validMoves.map((move) => {
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
