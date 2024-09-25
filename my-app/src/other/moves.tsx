import { TileStats, Move, PieceStats } from "../App";

const protoNormalMoveSets = {
  king: [[{ x: 0, y: 1 }], [{ x: 1, y: 1 }]],
  queen: [[{ x: 0, y: 1 }], [{ x: 1, y: 1 }]],
  rook: [[{ x: 0, y: 1 }]],
  bishop: [[{ x: 1, y: 1 }]],
  knight: [[{ x: 1, y: 2 }], [{ x: 2, y: 1 }]],
  pawn: [[{ x: 0, y: -1 }]],
};

function rotateMoveSet(moveSet: { x: number; y: number }[][]) {
  for (const directionMoveSet of moveSet.slice()) {
    for (let i = 0; i < 3; i++) {
      const newDirectionMoveSet = [];
      for (const move of directionMoveSet) {
        const newMove =
          i === 0
            ? { x: move.y, y: -move.x }
            : i === 1
            ? { x: -move.x, y: -move.y }
            : { x: -move.y, y: move.x };
        newDirectionMoveSet.push(newMove);
      }
      moveSet.push(newDirectionMoveSet);
    }
  }
}

rotateMoveSet(protoNormalMoveSets.king);
rotateMoveSet(protoNormalMoveSets.queen);
rotateMoveSet(protoNormalMoveSets.rook);
rotateMoveSet(protoNormalMoveSets.bishop);
rotateMoveSet(protoNormalMoveSets.knight);

function extendMoveSet(moveSet: { x: number; y: number }[][]) {
  for (const directionMoveSet of moveSet) {
    for (let i = 2; i < 8; i++) {
      directionMoveSet.push({
        x: i * directionMoveSet[0].x,
        y: i * directionMoveSet[0].y,
      });
    }
  }
}

extendMoveSet(protoNormalMoveSets.queen);
extendMoveSet(protoNormalMoveSets.rook);
extendMoveSet(protoNormalMoveSets.bishop);

const normalMoveSets = protoNormalMoveSets;

export function getMoves(
  gameState: TileStats[][],
  y: number,
  x: number,
  color: string,
  type: string,
  hasMoved: boolean,
  potentialEnPassant?: {
    y: number;
    x: number;
    pieceStats: PieceStats;
  }
): Move[] {
  const moves = [] as Move[];
  const convertedType = type as
    | "king"
    | "queen"
    | "rook"
    | "bishop"
    | "knight"
    | "pawn";
  const relativeMoves = normalMoveSets[convertedType];
  const absoluteMoves = relativeMoves.map((directionalMoveSet) =>
    directionalMoveSet.map((move) => {
      return {
        x: move.x + x,
        y: move.y + y,
      };
    })
  );
  if (type === "pawn" && !hasMoved) {
    absoluteMoves[0].push({
      x: absoluteMoves[0][0].x,
      y: absoluteMoves[0][0].y - 1,
    });
  }
  if (type === "pawn" && color === "black") {
    for (let i = 0; i < absoluteMoves[0].length; i++) {
      absoluteMoves[0][i].y += 2 * (i + 1);
    }
  }
  const validNormalMoves = absoluteMoves.map((directionalMoveSet) => {
    let blocked = false;
    return directionalMoveSet.map((move) => {
      if (blocked || move.y < 0 || move.y > 7 || move.x < 0 || move.x > 7)
        return;
      if (!gameState[move.y][move.x]?.pieceStats) {
        return { x: move.x, y: move.y, isEnemy: false };
      }
      if (gameState[move.y][move.x].pieceStats?.color === color) {
        blocked = true;
        return;
      } else if (type !== "pawn") {
        blocked = true;
        return { x: move.x, y: move.y, isEnemy: true };
      } else {
        return;
      }
    });
  });
  if (
    potentialEnPassant &&
    type === "pawn" &&
    potentialEnPassant.y === y &&
    Math.abs(potentialEnPassant.x - x) === 1
  ) {
    moves.push({
      x: potentialEnPassant.x,
      y:
        color === "white" ? potentialEnPassant.y - 1 : potentialEnPassant.y + 1,
      isEnemy: true,
    });
  }
  for (const directionalMoveSet of validNormalMoves) {
    for (const move of directionalMoveSet.filter((e) => e !== undefined)) {
      moves.push(move);
    }
  }
  return moves;
}
