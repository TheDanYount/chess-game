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

function isThreatened(
  color: string,
  y: number,
  x: number,
  gameState: TileStats[][]
) {
  const relativePaths = normalMoveSets.queen;
  const absolutePaths = relativePaths.map((directionalMoveSet) =>
    directionalMoveSet.map((move) => {
      return {
        x: move.x + x,
        y: move.y + y,
      };
    })
  );
  const validPaths = absolutePaths.map((directionalMoveSet) =>
    directionalMoveSet.filter((move) => {
      if (move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7) return false;
      return true;
    })
  );
  for (let i = 0; i < validPaths.length; i++) {
    for (let j = 0; j < validPaths[i].length; j++) {
      const potentialConflict =
        gameState[validPaths[i][j].y][validPaths[i][j].x].pieceStats;
      if (
        potentialConflict &&
        !(
          potentialConflict.type === "king" && potentialConflict.color === color
        )
      ) {
        if (potentialConflict.color === color) break;
        if (
          (validPaths[i][j].y === y || validPaths[i][j].x === x) &&
          (potentialConflict.type === "queen" ||
            potentialConflict.type === "rook")
        ) {
          return true;
        } else if (
          validPaths[i][j].y !== y &&
          validPaths[i][j].x !== x &&
          (potentialConflict.type === "bishop" ||
            (potentialConflict.type === "king" && j === 0) ||
            (potentialConflict.type === "pawn" &&
              j === 0 &&
              ((color === "white" && validPaths[i][j].y < y) ||
                (color === "black" && validPaths[i][j].y > y))))
        ) {
          return true;
        }
      }
    }
  }
  const relativeSpots = normalMoveSets.knight;
  const absoluteSpots = [];
  for (const moveSet of relativeSpots) {
    absoluteSpots.push({ x: moveSet[0].x + x, y: moveSet[0].y + y });
  }
  for (const move of absoluteSpots) {
    if (move.x > -1 && move.x < 8 && move.y > -1 && move.y < 8) {
      const potentialConflict = gameState[move.y][move.x].pieceStats;
      if (
        potentialConflict &&
        potentialConflict.color !== color &&
        potentialConflict.type === "knight"
      ) {
        return true;
      }
    }
  }
  return false;
}

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
  if (type === "pawn") {
    if (color === "white") {
      for (let i = -1; i < 2; i += 2) {
        if (
          x + i > -1 &&
          x + i < 8 &&
          gameState[y - 1][x + i].pieceStats?.color === "black"
        ) {
          moves.push({
            y: y - 1,
            x: x + i,
            isEnemy: true,
          });
        }
      }
    } /* meaning if color === 'black' */ else {
      for (let i = -1; i < 2; i += 2) {
        if (
          x + i > -1 &&
          x + i < 8 &&
          gameState[y + 1][x + i].pieceStats?.color === "white"
        ) {
          moves.push({
            y: y + 1,
            x: x + i,
            isEnemy: true,
          });
        }
      }
    }
  }
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
  if (type === "king" && !hasMoved) {
    // Queen side castle
    if (
      gameState[y][0].pieceStats &&
      gameState[y][0].pieceStats.type === "rook" &&
      !gameState[y][0].pieceStats.hasMoved &&
      gameState[y][1].pieceStats === undefined &&
      gameState[y][2].pieceStats === undefined &&
      gameState[y][3].pieceStats === undefined &&
      !isThreatened(color, y, 2, gameState) &&
      !isThreatened(color, y, 3, gameState) &&
      !isThreatened(color, y, 4, gameState)
    ) {
      moves.push({ x: 2, y, isEnemy: false });
    }
    // King side castle
    if (
      gameState[y][7].pieceStats &&
      gameState[y][7].pieceStats.type === "rook" &&
      !gameState[y][7].pieceStats.hasMoved &&
      gameState[y][5].pieceStats === undefined &&
      gameState[y][6].pieceStats === undefined &&
      !isThreatened(color, y, 4, gameState) &&
      !isThreatened(color, y, 5, gameState) &&
      !isThreatened(color, y, 6, gameState)
    ) {
      moves.push({ x: 6, y, isEnemy: false });
    }
  }
  for (const directionalMoveSet of validNormalMoves) {
    for (const move of directionalMoveSet.filter((e) => e !== undefined)) {
      moves.push(move);
    }
  }
  return moves;
}
