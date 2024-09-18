import { useState } from "react";
import { ChessPiece } from "./components/ChessPiece";
const moveSets = {
  king: [
    [[0, 1]],
    [[1, 1]],
    [[1, 0]],
    [[1, -1]],
    [[0, -1]],
    [[-1, -1]],
    [[-1, 0]],
    [[-1, 1]],
  ],
  queen: [
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
    [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
    ],
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
    ],
    [
      [1, -1],
      [2, -2],
      [3, -3],
      [4, -4],
      [5, -5],
      [6, -6],
      [7, -7],
    ],
    [
      [0, -1],
      [0, -2],
      [0, -3],
      [0, -4],
      [0, -5],
      [0, -6],
      [0, -7],
    ],
    [
      [-1, -1],
      [-2, -2],
      [-3, -3],
      [-4, -4],
      [-5, -5],
      [-6, -6],
      [-7, -7],
    ],
    [
      [-1, 0],
      [-2, 0],
      [-3, 0],
      [-4, 0],
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    [
      [-1, 1],
      [-2, 2],
      [-3, 3],
      [-4, 4],
      [-5, 5],
      [-6, 6],
      [-7, 7],
    ],
  ],
  rook: [
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ],
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
    ],
    [
      [0, -1],
      [0, -2],
      [0, -3],
      [0, -4],
      [0, -5],
      [0, -6],
      [0, -7],
    ],
    [
      [-1, 0],
      [-2, 0],
      [-3, 0],
      [-4, 0],
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
  ],
  bishop: [
    [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
    ],
    [
      [1, -1],
      [2, -2],
      [3, -3],
      [4, -4],
      [5, -5],
      [6, -6],
      [7, -7],
    ],
    [
      [-1, -1],
      [-2, -2],
      [-3, -3],
      [-4, -4],
      [-5, -5],
      [-6, -6],
      [-7, -7],
    ],
    [
      [-1, 1],
      [-2, 2],
      [-3, 3],
      [-4, 4],
      [-5, 5],
      [-6, 6],
      [-7, 7],
    ],
  ],
  knight: [
    [[1, 2]],
    [[2, 1]],
    [[2, -1]],
    [[1, -2]],
    [[-1, -2]],
    [[-2, -1]],
    [[-2, 1]],
    [[-1, 2]],
  ],
  pawn: [[[0, 1]]],
};

export default function App() {
  const [player1Lane, setPlayer1Lane] = useState();
  const [player2Lane, setPlayer2Lane] = useState();
  const [gameState, setGameState] = useState([
    [
      <ChessPiece
        key={`piecex:0y:0`}
        position={{ x: 0, y: 0 }}
        color={"b"}
        startType={"rook"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:1y:0`}
        position={{ x: 1, y: 0 }}
        color={"b"}
        startType={"knight"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:2y:0`}
        position={{ x: 2, y: 0 }}
        color={"b"}
        startType={"bishop"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:3y:0`}
        position={{ x: 3, y: 0 }}
        color={"b"}
        startType={"queen"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:4y:0`}
        position={{ x: 4, y: 0 }}
        color={"b"}
        startType={"king"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:5y:0`}
        position={{ x: 5, y: 0 }}
        color={"b"}
        startType={"bishop"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:6y:0`}
        position={{ x: 6, y: 0 }}
        color={"b"}
        startType={"knight"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:7y:0`}
        position={{ x: 7, y: 0 }}
        color={"b"}
        startType={"rook"}
        onPieceClick={handlePieceClick}
      />,
    ],
    [
      <ChessPiece
        key={`piecex:0y:1`}
        position={{ x: 0, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:1y:1`}
        position={{ x: 1, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:2y:1`}
        position={{ x: 2, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:3y:1`}
        position={{ x: 3, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:4y:1`}
        position={{ x: 4, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:5y:1`}
        position={{ x: 5, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:6y:1`}
        position={{ x: 6, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:7y:1`}
        position={{ x: 7, y: 1 }}
        color={"b"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
    ],
    rowOfBlanks.slice(),
    rowOfBlanks.slice(),
    rowOfBlanks.slice(),
    rowOfBlanks.slice(),
    [
      <ChessPiece
        key={`piecex:0y:6`}
        position={{ x: 0, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:1y:6`}
        position={{ x: 1, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:2y:6`}
        position={{ x: 2, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:3y:6`}
        position={{ x: 3, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:4y:6`}
        position={{ x: 4, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:5y:6`}
        position={{ x: 5, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:6y:6`}
        position={{ x: 6, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:7y:6`}
        position={{ x: 7, y: 6 }}
        color={"w"}
        startType={"pawn"}
        onPieceClick={handlePieceClick}
      />,
    ],
    [
      <ChessPiece
        key={`piecex:0y:7`}
        position={{ x: 0, y: 7 }}
        color={"w"}
        startType={"rook"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:1y:7`}
        position={{ x: 1, y: 7 }}
        color={"w"}
        startType={"knight"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:2y:7`}
        position={{ x: 2, y: 7 }}
        color={"w"}
        startType={"bishop"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:3y:7`}
        position={{ x: 3, y: 7 }}
        color={"w"}
        startType={"king"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:4y:7`}
        position={{ x: 4, y: 7 }}
        color={"w"}
        startType={"queen"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:5y:7`}
        position={{ x: 5, y: 7 }}
        color={"w"}
        startType={"bishop"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:6y:7`}
        position={{ x: 6, y: 7 }}
        color={"w"}
        startType={"knight"}
        onPieceClick={handlePieceClick}
      />,
      <ChessPiece
        key={`piecex:7y:7`}
        position={{ x: 7, y: 7 }}
        color={"w"}
        startType={"rook"}
        onPieceClick={handlePieceClick}
      />,
    ],
  ]);
  const [whitesTurn, setWhitesTurn] = useState(true);
  const [potentialMoves, setPotentialMoves] =
    useState<[number, number, string][]>();

  const rows = [];
  for (let i = 0; i < 8; i++) {
    const spaces = [];
    for (let j = 0; j < 8; j++) {
      const isWhite = (i + j) % 2 === 0 ? true : false;
      const isGreen = potentialMoves
        ? potentialMoves.find((e) => {
            return e[0] === j && e[1] === i && e[2] === "g";
          })
        : false;
      const isRed = potentialMoves
        ? potentialMoves.find((e) => {
            return e[0] === j && e[1] === i && e[2] === "r";
          })
        : false;
      spaces.push(
        <div
          key={`row${8 - i}column${j + 1}`}
          className={`w-[12.5%] h-full ${
            isWhite
              ? isRed
                ? "bg-[#F48A81]"
                : isGreen
                ? "bg-[#8EF081]"
                : "bg-[#EEE7D8]"
              : isRed
              ? "bg-[#700E17]"
              : isGreen
              ? "bg-[#0A7417]"
              : "bg-[#111827]"
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

  function getValidMoves(
    position: Position,
    type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn"
  ) {
    const relativeMovePotentails = moveSets[type];
    const AbsolutePotentials = [];
    for (const moveArray of relativeMovePotentails) {
      let newMoveArray = moveArray.map((e) => {
        return [position.x + e[0], position.y - e[1]];
      });
      newMoveArray = newMoveArray.filter((e) => {
        return e[0] > -1 && e[0] < 8 && e[1] > -1 && e[1] < 8;
      });
      if (newMoveArray.length > 0) AbsolutePotentials.push(newMoveArray);
    }
    const theMoveArray = [];
    for (const set of AbsolutePotentials) {
      for (const coordinates of set) {
        const potentialMove = [coordinates[0], coordinates[1], "g"] as [
          number,
          number,
          string
        ];
        theMoveArray.push(potentialMove);
      }
    }
    console.log(theMoveArray);
    setPotentialMoves(theMoveArray);
  }

  function handlePieceClick(
    position: Position,
    color: string,
    type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn",
    hasMoved: boolean,
    isImprisoned: boolean
  ) {
    if (isImprisoned) return;
    if ((whitesTurn && color === "w") || (!whitesTurn && color === "b")) {
      getValidMoves(position, type);
    }
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

type Position = {
  x: number;
  y: number;
};
