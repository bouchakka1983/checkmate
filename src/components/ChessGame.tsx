
import { useState, useCallback } from 'react';
import ChessBoard from './ChessBoard';
import { GameState, Piece, Position } from '@/types/chess';
import { initializeBoard, isValidMove, makeMove, isInCheck, isCheckmate } from '@/utils/chessLogic';
import { toast } from 'sonner';

const ChessGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    currentPlayer: 'white',
    selectedSquare: null,
    gameStatus: 'playing',
    moveHistory: []
  });

  const handleSquareClick = useCallback((position: Position) => {
    const { board, currentPlayer, selectedSquare } = gameState;
    const piece = board[position.row][position.col];

    // If no square is selected
    if (!selectedSquare) {
      // Select piece if it belongs to current player
      if (piece && piece.color === currentPlayer) {
        setGameState(prev => ({ ...prev, selectedSquare: position }));
      }
      return;
    }

    // If clicking the same square, deselect
    if (selectedSquare.row === position.row && selectedSquare.col === position.col) {
      setGameState(prev => ({ ...prev, selectedSquare: null }));
      return;
    }

    // If clicking another piece of the same color, select it
    if (piece && piece.color === currentPlayer) {
      setGameState(prev => ({ ...prev, selectedSquare: position }));
      return;
    }

    // Try to make a move
    if (isValidMove(board, selectedSquare, position, currentPlayer)) {
      const newBoard = makeMove(board, selectedSquare, position);
      const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
      
      // Check for check/checkmate
      if (isInCheck(newBoard, nextPlayer)) {
        if (isCheckmate(newBoard, nextPlayer)) {
          toast.success(`Checkmate! ${currentPlayer} wins!`);
          setGameState(prev => ({
            ...prev,
            board: newBoard,
            selectedSquare: null,
            gameStatus: 'checkmate'
          }));
          return;
        } else {
          toast.warning(`${nextPlayer} is in check!`);
        }
      }

      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: nextPlayer,
        selectedSquare: null,
        moveHistory: [...prev.moveHistory, { from: selectedSquare, to: position }]
      }));
    } else {
      setGameState(prev => ({ ...prev, selectedSquare: null }));
    }
  }, [gameState]);

  const resetGame = () => {
    setGameState({
      board: initializeBoard(),
      currentPlayer: 'white',
      selectedSquare: null,
      gameStatus: 'playing',
      moveHistory: []
    });
    toast.success('New game started!');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
      <div className="relative">
        <ChessBoard 
          board={gameState.board}
          selectedSquare={gameState.selectedSquare}
          onSquareClick={handleSquareClick}
        />
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Game Info</h2>
          <div className="space-y-2">
            <p className="text-slate-300">
              Current Turn: <span className="font-semibold text-white capitalize">{gameState.currentPlayer}</span>
            </p>
            <p className="text-slate-300">
              Status: <span className="font-semibold text-white capitalize">{gameState.gameStatus}</span>
            </p>
          </div>
        </div>
        
        <button
          onClick={resetGame}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          New Game
        </button>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">How to Play</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Click a piece to select it</li>
            <li>• Click a valid square to move</li>
            <li>• Capture opponent pieces</li>
            <li>• Protect your king!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
