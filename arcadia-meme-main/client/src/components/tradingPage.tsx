import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { PopupMessage } from "./popUp";
import TradingViewWidget from "./tradingWidget";

interface CoinData {
  name: string;
  ticker: string;
  description: string;
  logo: string; // URL for the logo
  marketCap: number;
  bondingProgress: number;
  kingProgress: number;
  address: string; // Contract address
}

interface Position {
  type: "Buy" | "Sell";
  amount: number;
  entryPrice: number;
  pnl: number; // Profit and Loss
}

const fallbackCoins: CoinData[] = [
  {
    name: "Ethereum",
    ticker: "ETH",
    description: "Ethereum is a decentralized blockchain platform.",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    marketCap: 200000000,
    bondingProgress: 80,
    kingProgress: 90,
    address: "0x0000...0000",
  },
  {
    name: "Solana",
    ticker: "SOL",
    description: "Solana is a blockchain optimized for speed and scalability.",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    marketCap: 100000000,
    bondingProgress: 60,
    kingProgress: 70,
    address: "0x1111...1111",
  },
  {
    name: "Bitcoin",
    ticker: "BTC",
    description: "Bitcoin is the first decentralized cryptocurrency.",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    marketCap: 1000000000,
    bondingProgress: 95,
    kingProgress: 100,
    address: "0x2222...2222",
  },
  {
    name: "TrumpCoin",
    ticker: "TRUMP",
    description: "TrumpCoin is a meme coin inspired by Trump’s popularity.",
    logo: "https://via.placeholder.com/100?text=TRUMP",
    marketCap: 50000000,
    bondingProgress: 50,
    kingProgress: 60,
    address: "0x3333...3333",
  },
];

export const TradingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [popup, setPopup] = useState<{
    type: "error" | "warning" | "info";
    message: string;
    image?: string; // Optional image property
  } | null>(null);

  const [positions, setPositions] = useState<Position[]>([]); // Start with no positions
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);
  const [tradeAmount, setTradeAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const coinData = location.state as CoinData | null;
  const randomFallbackCoin = useMemo(
    () => fallbackCoins[Math.floor(Math.random() * fallbackCoins.length)],
    []
  );

  useEffect(() => {
    if (!coinData) {
      setPopup({
        type: "warning",
        message: "Trading data is unavailable. Showing a fallback coin.",
      });
    }
  }, [coinData]);

  const data = coinData || randomFallbackCoin;

  const handleTrade = () => {
    if (!tradeAmount || tradeAmount <= 0) {
      setPopup({
        type: "error",
        message: "Please enter a valid amount to trade.",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate trade processing delay
    setTimeout(() => {
      const newPosition: Position = {
        type: tradeType === "buy" ? "Buy" : "Sell",
        amount: tradeAmount,
        entryPrice: Math.random() * 1000 + 1000, // Random price for simplicity
        pnl: Math.random() * 200 - 100, // Random PnL
      };

      setPositions((prevPositions) => [...prevPositions, newPosition]); // Add the new position
      setTradeAmount(null); // Reset trade input
      setIsProcessing(false);

      setPopup({
        type: "info",
        message: `Successfully ${tradeType === "buy" ? "bought" : "sold"} ${
          tradeAmount
        } ${data.ticker}!`,
        image: "/1000x-ape.gif", // Add the GIF here
      });
    }, 2000);
  };

  const handleExitAll = () => {
    const totalPnL = positions.reduce((acc, pos) => acc + pos.pnl, 0); // Sum up all PnL
    setPositions([]); // Clear all positions
    setPopup({
      type: totalPnL >= 0 ? "info" : "error",
      message: `Exited all positions with a ${
        totalPnL >= 0 ? "profit" : "loss"
      } of $${totalPnL.toFixed(2)}!`,
      image: totalPnL >= 0 ? "/1000x-ape.gif" : undefined, // Show GIF if profit
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Popup Message */}
      {popup && (
        <PopupMessage
          type={popup.type}
          message={popup.message}
          image={popup.image}
          onDismiss={() => setPopup(null)}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span
            onClick={() => navigate("/")}
            className="text-gray-400 text-sm underline cursor-pointer"
          >
            [go back]
          </span>
          <span className="font-bold text-lg">
            {data.name.toUpperCase()} ({data.ticker.toUpperCase()})
          </span>
        </div>
        <div className="flex space-x-4 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">
            how it works
          </a>
          <a href="#" className="hover:text-white">
            advanced
          </a>
          <a href="#" className="hover:text-white">
            support
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Trading Chart Section */}
        <div className="flex-1 p-6">
          <TradingViewWidget symbol={data.ticker.toUpperCase()} />
        </div>

        {/* Trading Details Section */}
        <div className="lg:w-1/3 w-full bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
          {/* Trade Form */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setTradeType("buy")}
                className={`px-4 py-2 rounded-lg font-bold ${
                  tradeType === "buy"
                    ? "bg-green-600 text-gray-900 scale-105"
                    : "bg-green-500 hover:bg-green-600 hover:scale-105"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType("sell")}
                className={`px-4 py-2 rounded-lg font-bold ${
                  tradeType === "sell"
                    ? "bg-red-600 text-gray-900 scale-105"
                    : "bg-gray-600 hover:bg-red-600 hover:scale-105"
                }`}
              >
                Sell
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  Amount ({data.ticker.toUpperCase()})
                </span>
                <input
                  type="number"
                  value={tradeAmount || ""}
                  onChange={(e) => setTradeAmount(parseFloat(e.target.value))}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                onClick={handleTrade}
                disabled={!tradeType || isProcessing}
                className={`w-full px-4 py-2 rounded-lg font-bold ${
                  isProcessing
                    ? "bg-gray-500 text-gray-400"
                    : "bg-green-500 hover:bg-green-600 hover:scale-105"
                }`}
              >
                {isProcessing ? "Processing..." : "Place Trade"}
              </button>
            </div>
          </div>

          {/* Coin Details */}
          <div className="bg-gray-700 p-4 rounded-lg space-y-6">
            <div className="flex items-center">
              <img
                src={data.logo}
                alt={`${data.name} logo`}
                className="w-12 h-12 rounded-lg mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{data.name.toUpperCase()}</h3>
                <p className="text-sm text-gray-400">{data.description}</p>
              </div>
            </div>

            {/* User Positions */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Your Positions</h4>
                <button
                  onClick={handleExitAll}
                  disabled={positions.length === 0}
                  className={`px-4 py-2 rounded-lg font-bold ${
                    positions.length === 0
                      ? "bg-gray-500 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Exit All
                </button>
              </div>
              {positions.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left">Type</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Entry Price</th>
                      <th className="text-left">PnL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position, index) => (
                      <tr key={index}>
                        <td>{position.type}</td>
                        <td>{position.amount.toFixed(2)}</td>
                        <td>${position.entryPrice.toFixed(2)}</td>
                        <td
                          className={
                            position.pnl >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {position.pnl >= 0 ? "+" : ""}
                          {position.pnl.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400">No positions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
