import { useState } from "react";
import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";

type Position = {
  x: number;
  y: number;
};

type Props = {
  position: Position;
  color: string;
  startType: string;
};

export function ChessPiece({ position, color, startType }: Props) {
  const [hasMoved, setHasMoved] = useState(false);
  const [isImprisoned, setIsImprisoned] = useState(false);
  const [type, setType] = useState(startType);
  return (
    <div
      className={`absolute w-[35px] md:w-[75px] h-[35px] md:h-[75px] flex
    justify-center items-center
    ${positions[position.x]} ${mdPositions[position.x]}
    ${positions[position.y + 8]} ${mdPositions[position.y + 8]}`}
    >
      <Icon color={color} type={type} />
    </div>
  );
}

type Props2 = {
  color: string;
  type: string;
};

function Icon({ color, type }: Props2) {
  let faIcon;
  const pieceColor = color === "w" ? "#E0D6C8" : "#1F2937";
  const pieceOutline = color === "w" ? "#1F2937" : "#E0D6C8";
  switch (type) {
    case "king":
      faIcon = (
        <FaChessKing
          stroke={pieceOutline}
          strokeWidth="25"
          fill={pieceColor}
          overflow="visible"
          className="w-4/5 h-4/5"
        />
      );
      break;
    case "queen":
      faIcon = (
        <FaChessQueen
          stroke={pieceOutline}
          strokeWidth="25"
          fill={pieceColor}
          overflow="visible"
          className="w-4/5 h-4/5"
        />
      );
      break;
    case "rook":
      faIcon = (
        <FaChessRook
          stroke={pieceOutline}
          strokeWidth="25"
          fill={pieceColor}
          overflow="visible"
          className="w-4/5 h-4/5"
        />
      );
      break;
    case "bishop":
      faIcon = (
        <FaChessBishop
          stroke={pieceOutline}
          strokeWidth="25"
          fill={pieceColor}
          overflow="visible"
          className="w-4/5 h-4/5"
        />
      );
      break;
    case "knight":
      faIcon = (
        <FaChessKnight
          stroke={pieceOutline}
          strokeWidth="25"
          fill={pieceColor}
          overflow="visible"
          className="w-4/5 h-4/5"
        />
      );
      break;
    default:
      faIcon = (
        <FaChessPawn
          stroke={pieceOutline}
          strokeWidth="25"
          fill={pieceColor}
          overflow="visible"
          className="w-4/5 h-4/5"
        />
      );
  }
  return faIcon;
}

const positions = [
  "left-[0px]",
  "left-[35px]",
  "left-[70px]",
  "left-[105px]",
  "left-[140px]",
  "left-[175px]",
  "left-[210px]",
  "left-[245px]",
  "top-[0px]",
  "top-[35px]",
  "top-[70px]",
  "top-[105px]",
  "top-[140px]",
  "top-[175px]",
  "top-[210px]",
  "top-[245px]",
];
const mdPositions = [
  "md:left-[0px]",
  "md:left-[75px]",
  "md:left-[150px]",
  "md:left-[225px]",
  "md:left-[300px]",
  "md:left-[375px]",
  "md:left-[450px]",
  "md:left-[525px]",
  "md:top-[0px]",
  "md:top-[75px]",
  "md:top-[150px]",
  "md:top-[225px]",
  "md:top-[300px]",
  "md:top-[375px]",
  "md:top-[450px]",
  "md:top-[525px]",
];
