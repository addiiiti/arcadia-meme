export const ArcadeList: React.FC = () => {
    return (
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center text-yellow-400">Popular Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4">
          {[1, 2, 3].map((game) => (
            <div key={game} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg">
              <h3 className="text-xl font-bold text-yellow-400">Game Title {game}</h3>
              <p className="text-gray-300 mt-2">A short description of the game.</p>
              <button className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded hover:bg-yellow-300">Play Now</button>
            </div>
          ))}
        </div>
      </section>
    );
  };