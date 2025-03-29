import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LandingSection: React.FC = () => {
  const [gifKey, setGifKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Reload the GIF every 9.99 seconds
    const interval = setInterval(() => {
      setGifKey((prevKey) => prevKey + 1); // Change the key to force re-render
    }, 9990);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="relative text-center py-20 px-4 overflow-hidden">
      {/* Background GIF */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          key={gifKey} // Use the key to force re-render
          src="/graph-landing.gif"
          alt="background gif"
          className="w-500 h-175"
        />
      </div>

      {/* Main Content */}
      <div className="relative mb-80">
        <h1 className="text-6xl text-yellow-500 font-bold uppercase tracking-widest pixel-font">
          Are you bold enough to win the next{" "}
          <span className="text-red-500 underline">100x</span>?
        </h1>
        <p className="text-lg text-green-500 mt-4 italic tracking-wide">
          fast money, big laughs, bold moves
        </p>
        <button
          onClick={() => navigate("/create-coin")}
          className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg border-4 border-yellow-500 hover:bg-yellow-300 hover:scale-105 transition-transform"
        >
          start new memecoin
        </button>
      </div>
    </section>
  );
};
