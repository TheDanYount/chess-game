import { Piece, Position } from "../App.tsx";
import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";

type Props = {
  pStats: Piece;
  onPieceClick: (
    pos: Position,
    color: string,
    type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn",
    hasNotMoved?: boolean,
    isImprisoned?: boolean
  ) => void;
};

export function ChessPiece({ pStats, onPieceClick }: Props) {
  return (
    <div
      className={`piece absolute w-[35px] md:w-[75px] h-[35px] md:h-[75px] flex
        justify-center items-center
    ${positions[pStats.position.x]} ${mdPositions[pStats.position.x]}
    ${positions[pStats.position.y + 8]} ${mdPositions[pStats.position.y + 8]}`}
      onClick={() =>
        onPieceClick(
          pStats.position,
          pStats.color,
          pStats.type,
          pStats.hasNotMoved,
          pStats.isImprisoned
        )
      }
    >
      <Icon color={pStats.color} type={pStats.type} />
    </div>
  );
}

type Props2 = {
  color: string;
  type: string;
};

function Icon({ color, type }: Props2) {
  let faIcon;
  const pieceColor = color === "white" ? "#E0D6C8" : "#1F2937";
  const pieceOutline = color === "white" ? "#1F2937" : "#E0D6C8";
  const attributes = {
    stroke: pieceOutline,
    strokeWidth: "25",
    fill: pieceColor,
    overflow: "visible",
    className: "w-4/5 h-4/5",
  };
  switch (type) {
    case "king":
      faIcon = <FaChessKing {...attributes} />;
      break;
    case "queen":
      faIcon = <FaChessQueen {...attributes} />;
      break;
    case "rook":
      faIcon = <FaChessRook {...attributes} />;
      break;
    case "bishop":
      faIcon = <FaChessBishop {...attributes} />;
      break;
    case "knight":
      faIcon = <FaChessKnight {...attributes} />;
      break;
    default:
      faIcon = <FaChessPawn {...attributes} />;
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
