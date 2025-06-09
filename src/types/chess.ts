
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type Color = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: Color;
  hasMoved?: boolean;
}

export type Board = (Piece | null)[][];

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  from: Position;
  to: Position;
}

export interface GameState {
  board: Board;
  currentPlayer: Color;
  selectedSquare: Position | null;
  gameStatus: 'playing' | 'check' | 'checkmate' | 'stalemate';
  moveHistory: Move[];
}
