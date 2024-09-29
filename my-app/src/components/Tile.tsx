import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";
import { TileStats } from "../App.tsx";

type Props = {
  y: number;
  x: number;
  tileStats: TileStats;
  onTileClick: (
    y: number,
    x: number,
    color?: string,
    type?: string,
    hasMoved?: boolean
  ) => void;
};

export function Tile({ y, x, tileStats, onTileClick }: Props) {
  return (
    <div
      className={`w-[35px] md:w-[75px] h-[35px] md:h-[75px] flex
        justify-center items-center ${tileStats.bgColor}`}
      onClick={() =>
        onTileClick(
          y,
          x,
          tileStats?.pieceStats?.color,
          tileStats?.pieceStats?.type,
          tileStats?.pieceStats?.hasMoved
        )
      }
    >
      {tileStats.pieceStats && (
        <Icon
          color={tileStats.pieceStats.color}
          type={tileStats.pieceStats.type}
        />
      )}
    </div>
  );
}

type Props2 = {
  color: string;
  type: string;
};

export function Icon({ color, type }: Props2) {
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
