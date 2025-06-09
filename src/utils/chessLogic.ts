
import { Board, Piece, Position, Color, PieceType } from '@/types/chess';

export const initializeBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Set up pawns
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Set up other pieces
  const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  
  for (let col = 0; col < 8; col++) {
    board[0][col] = { type: pieceOrder[col], color: 'black' };
    board[7][col] = { type: pieceOrder[col], color: 'white' };
  }
  
  return board;
};

export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

export const getPossibleMoves = (board: Board, from: Position, piece: Piece): Position[] => {
  const moves: Position[] = [];
  const { row, col } = from;
  
  switch (piece.type) {
    case 'pawn':
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      
      // Move forward
      if (isValidPosition(row + direction, col) && !board[row + direction][col]) {
        moves.push({ row: row + direction, col });
        
        // Double move from starting position
        if (row === startRow && isValidPosition(row + 2 * direction, col) && !board[row + 2 * direction][col]) {
          moves.push({ row: row + 2 * direction, col });
        }
      }
      
      // Capture diagonally
      [-1, 1].forEach(dcol => {
        const newRow = row + direction;
        const newCol = col + dcol;
        if (isValidPosition(newRow, newCol)) {
          const target = board[newRow][newCol];
          if (target && target.color !== piece.color) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      });
      break;
      
    case 'rook':
      // Horizontal and vertical moves
      [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([drow, dcol]) => {
        for (let i = 1; i < 8; i++) {
          const newRow = row + i * drow;
          const newCol = col + i * dcol;
          
          if (!isValidPosition(newRow, newCol)) break;
          
          const target = board[newRow][newCol];
          if (!target) {
            moves.push({ row: newRow, col: newCol });
          } else {
            if (target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      });
      break;
      
    case 'bishop':
      // Diagonal moves
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([drow, dcol]) => {
        for (let i = 1; i < 8; i++) {
          const newRow = row + i * drow;
          const newCol = col + i * dcol;
          
          if (!isValidPosition(newRow, newCol)) break;
          
          const target = board[newRow][newCol];
          if (!target) {
            moves.push({ row: newRow, col: newCol });
          } else {
            if (target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      });
      break;
      
    case 'queen':
      // Combination of rook and bishop moves
      [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([drow, dcol]) => {
        for (let i = 1; i < 8; i++) {
          const newRow = row + i * drow;
          const newCol = col + i * dcol;
          
          if (!isValidPosition(newRow, newCol)) break;
          
          const target = board[newRow][newCol];
          if (!target) {
            moves.push({ row: newRow, col: newCol });
          } else {
            if (target.color !== piece.color) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      });
      break;
      
    case 'king':
      // One square in any direction
      [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([drow, dcol]) => {
        const newRow = row + drow;
        const newCol = col + dcol;
        
        if (isValidPosition(newRow, newCol)) {
          const target = board[newRow][newCol];
          if (!target || target.color !== piece.color) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      });
      break;
      
    case 'knight':
      // L-shaped moves
      [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([drow, dcol]) => {
        const newRow = row + drow;
        const newCol = col + dcol;
        
        if (isValidPosition(newRow, newCol)) {
          const target = board[newRow][newCol];
          if (!target || target.color !== piece.color) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      });
      break;
  }
  
  return moves;
};

export const isValidMove = (board: Board, from: Position, to: Position, currentPlayer: Color): boolean => {
  const piece = board[from.row][from.col];
  if (!piece || piece.color !== currentPlayer) return false;
  
  const possibleMoves = getPossibleMoves(board, from, piece);
  return possibleMoves.some(move => move.row === to.row && move.col === to.col);
};

export const makeMove = (board: Board, from: Position, to: Position): Board => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[from.row][from.col];
  
  newBoard[to.row][to.col] = piece;
  newBoard[from.row][from.col] = null;
  
  // Mark piece as moved (for castling logic)
  if (piece) {
    piece.hasMoved = true;
  }
  
  return newBoard;
};

export const findKing = (board: Board, color: Color): Position | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isSquareAttacked = (board: Board, position: Position, byColor: Color): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === byColor) {
        const moves = getPossibleMoves(board, { row, col }, piece);
        if (moves.some(move => move.row === position.row && move.col === position.col)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const isInCheck = (board: Board, color: Color): boolean => {
  const kingPosition = findKing(board, color);
  if (!kingPosition) return false;
  
  const opponentColor = color === 'white' ? 'black' : 'white';
  return isSquareAttacked(board, kingPosition, opponentColor);
};

export const isCheckmate = (board: Board, color: Color): boolean => {
  if (!isInCheck(board, color)) return false;
  
  // Check if any move can get out of check
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const moves = getPossibleMoves(board, { row, col }, piece);
        
        for (const move of moves) {
          const testBoard = makeMove(board, { row, col }, move);
          if (!isInCheck(testBoard, color)) {
            return false; // Found a move that gets out of check
          }
        }
      }
    }
  }
  
  return true; // No moves can get out of check
};
