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

export const normalMoveSets = protoNormalMoveSets;
