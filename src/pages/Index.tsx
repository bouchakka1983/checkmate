
import ChessGame from '@/components/ChessGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            ♛ Checkmate Chess ♛
          </h1>
          <p className="text-slate-300 text-lg">Experience the royal game in style</p>
        </div>
        <ChessGame />
      </div>
    </div>
  );
};

export default Index;
