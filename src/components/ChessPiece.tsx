
import { Piece } from '@/types/chess';

interface ChessPieceProps {
  piece: Piece;
  isSelected?: boolean;
}

const ChessPiece = ({ piece, isSelected }: ChessPieceProps) => {
  const getPieceSymbol = (piece: Piece): string => {
    const symbols = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };
    
    return symbols[piece.color][piece.type];
  };

  return (
    <div 
      className={`
        text-4xl select-none transition-all duration-200 
        ${isSelected ? 'transform scale-110 drop-shadow-lg' : 'hover:transform hover:scale-105'}
        ${piece.color === 'white' ? 'text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]' : 'text-gray-900 drop-shadow-[1px_1px_2px_rgba(255,255,255,0.3)]'}
      `}
    >
      {getPieceSymbol(piece)}
    </div>
  );
};

export default ChessPiece;
