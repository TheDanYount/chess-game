import { useState } from "react";
import { ChessPiece } from "./components/ChessPiece";

export default function App() {
  const rows = [];
  const [player1Lane, setPlayer1Lane] = useState();
  const [player2Lane, setPlayer2Lane] = useState();
  const [gameState, setGameState] = useState(startConditions);
  for (let i = 0; i < 8; i++) {
    const spaces = [];
    for (let j = 0; j < 8; j++) {
      const isWhite = (i + j) % 2 === 0 ? true : false;
      spaces.push(
        <div
          key={`row${8 - i}column${j + 1}`}
          className={`w-[12.5%] h-full ${
            isWhite ? "bg-[#EEE7D8]" : "bg-[#111827]"
          }`}
        ></div>
      );
    }
    const row = (
      <div key={`row${8 - i}`} className="flex w-full h-[12.5%]">
        {spaces}
      </div>
    );
    rows.push(row);
  }
  return (
    <div className="flex justify-center">
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
      <div className="relative w-[280px] md:w-[600px] h-[280px] md:h-[600px]">
        {rows}
        {gameState.map((e) => {
          return e;
        })}
      </div>
      <div className="w-[35px] md:w-[75px] h-[280px] md:h-[600px]"></div>
    </div>
  );
}

const rowOfBlanks = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

const startConditions = [
  [
    [
      <ChessPiece position={{ x: 0, y: 0 }} color={"b"} startType={"rook"} />,
      <ChessPiece position={{ x: 1, y: 0 }} color={"b"} startType={"knight"} />,
      <ChessPiece position={{ x: 2, y: 0 }} color={"b"} startType={"bishop"} />,
      <ChessPiece position={{ x: 3, y: 0 }} color={"b"} startType={"queen"} />,
      <ChessPiece position={{ x: 4, y: 0 }} color={"b"} startType={"king"} />,
      <ChessPiece position={{ x: 5, y: 0 }} color={"b"} startType={"bishop"} />,
      <ChessPiece position={{ x: 6, y: 0 }} color={"b"} startType={"knight"} />,
      <ChessPiece position={{ x: 7, y: 0 }} color={"b"} startType={"rook"} />,
    ],
    [
      <ChessPiece position={{ x: 0, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 1, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 2, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 3, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 4, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 5, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 6, y: 1 }} color={"b"} startType={"pawn"} />,
      <ChessPiece position={{ x: 7, y: 1 }} color={"b"} startType={"pawn"} />,
    ],
    rowOfBlanks.slice(),
    rowOfBlanks.slice(),
    rowOfBlanks.slice(),
    rowOfBlanks.slice(),
    [
      <ChessPiece position={{ x: 0, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 1, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 2, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 3, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 4, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 5, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 6, y: 6 }} color={"w"} startType={"pawn"} />,
      <ChessPiece position={{ x: 7, y: 6 }} color={"w"} startType={"pawn"} />,
    ],
    [
      <ChessPiece position={{ x: 0, y: 7 }} color={"w"} startType={"rook"} />,
      <ChessPiece position={{ x: 1, y: 7 }} color={"w"} startType={"knight"} />,
      <ChessPiece position={{ x: 2, y: 7 }} color={"w"} startType={"bishop"} />,
      <ChessPiece position={{ x: 3, y: 7 }} color={"w"} startType={"king"} />,
      <ChessPiece position={{ x: 4, y: 7 }} color={"w"} startType={"queen"} />,
      <ChessPiece position={{ x: 5, y: 7 }} color={"w"} startType={"bishop"} />,
      <ChessPiece position={{ x: 6, y: 7 }} color={"w"} startType={"knight"} />,
      <ChessPiece position={{ x: 7, y: 7 }} color={"w"} startType={"rook"} />,
    ],
  ],
];
