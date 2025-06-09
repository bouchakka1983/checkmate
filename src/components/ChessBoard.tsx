
import { Board, Position } from '@/types/chess';
import ChessPiece from './ChessPiece';

interface ChessBoardProps {
  board: Board;
  selectedSquare: Position | null;
  onSquareClick: (position: Position) => void;
}

const ChessBoard = ({ board, selectedSquare, onSquareClick }: ChessBoardProps) => {
  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  const isLightSquare = (row: number, col: number) => {
    return (row + col) % 2 === 0;
  };

  return (
    <div className="relative">
      {/* Board border with coordinates */}
      <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-4 rounded-2xl shadow-2xl">
        {/* Column labels (top) */}
        <div className="flex justify-center mb-2">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
            <div key={letter} className="w-16 h-6 flex items-center justify-center text-amber-200 font-bold">
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
        
        <div className="flex">
          {/* Row labels (left) */}
          <div className="flex flex-col justify-center mr-2">
            {[8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
              <div key={number} className="w-6 h-16 flex items-center justify-center text-amber-200 font-bold">
                {number}
              </div>
            ))}
          </div>
          
          {/* Chess board */}
          <div className="grid grid-cols-8 gap-0 border-4 border-amber-900 rounded-lg overflow-hidden shadow-inner">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-16 h-16 flex items-center justify-center cursor-pointer relative
                    transition-all duration-200 hover:scale-105
                    ${isLightSquare(rowIndex, colIndex) 
                      ? 'bg-gradient-to-br from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300' 
                      : 'bg-gradient-to-br from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800'
                    }
                    ${isSquareSelected(rowIndex, colIndex) 
                      ? 'ring-4 ring-yellow-400 ring-opacity-80 shadow-lg' 
                      : ''
                    }
                  `}
                  onClick={() => onSquareClick({ row: rowIndex, col: colIndex })}
                >
                  {piece && (
                    <ChessPiece 
                      piece={piece} 
                      isSelected={isSquareSelected(rowIndex, colIndex)}
                    />
                  )}
                  
                  {/* Selection indicator */}
                  {isSquareSelected(rowIndex, colIndex) && (
                    <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 animate-pulse rounded-sm" />
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Row labels (right) */}
          <div className="flex flex-col justify-center ml-2">
            {[8, 7, 6, 5, 4, 3, 2, 1].map((number) => (
              <div key={number} className="w-6 h-16 flex items-center justify-center text-amber-200 font-bold">
                {number}
              </div>
            ))}
          </div>
        </div>
        
        {/* Column labels (bottom) */}
        <div className="flex justify-center mt-2">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((letter) => (
            <div key={letter} className="w-16 h-6 flex items-center justify-center text-amber-200 font-bold">
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
