import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "./walletProvider";

export const CreateCoin: React.FC = () => {
  const { walletAddress } = useWallet();
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("0.0");
  const [token, setToken] = useState("SOL"); // Default token
  const navigate = useNavigate();

  const coinLogos: Record<string, string> = {
    SOL: "https://cryptologos.cc/logos/solana-sol-logo.png",
    ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    APT: "https://cryptologos.cc/logos/aptos-apt-logo.png",
    EDU: "https://via.placeholder.com/100?text=EDU", // Placeholder for EDU
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCreateCoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) {
      alert("Please connect your wallet before proceeding.");
      return;
    }

    if (!name || !ticker || !description) {
      alert("Please fill out all required fields.");
      return;
    }

    setShowPopup(true); // Show confirmation popup
  };

  const handleTradeConfirmation = () => {
    setShowPopup(false);

    // Ensure the ticker is valid before navigating
    const validTicker = ticker.trim() || "DEFAULT";
    navigate(`/trade/${validTicker.toUpperCase()}`); // Navigate to the TradingView page
  };

  return (
    <section className="relative text-center py-20 px-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
        <a href="/" className="text-blue-500 text-sm mb-4 block underline">
          [go back]
        </a>
        <form onSubmit={handleCreateCoin} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-left text-blue-500 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Ticker */}
          <div>
            <label className="block text-left text-blue-500 mb-1">Ticker</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-left text-blue-500 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-left text-blue-500 mb-1">
              Image or Video
            </label>
            <div className="w-full bg-gray-700 text-center py-6 rounded border border-gray-600">
              <p className="text-gray-400 mb-2">Drag and drop an image or video</p>
              <input
                type="file"
                accept="image/,video/"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-yellow-400 text-gray-900 font-bold rounded cursor-pointer hover:bg-yellow-300"
              >
                Select File
              </label>
              {file && (
                <p className="text-green-500 mt-2">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold transition-transform transform ${
              walletAddress
                ? "bg-purple-600 hover:bg-purple-500 text-white hover:scale-105"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!walletAddress}
          >
            {walletAddress ? "Create Coin" : "Connect Wallet to Proceed"}
          </button>
        </form>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-4">
              Choose how many [{ticker}] you want to buy (optional)
            </h2>
            <p className="text-sm text-gray-400 text-center mb-6">
              Tip: Buying a small amount of coins helps protect your coin from
              snipers.
            </p>

            {/* Logo and Input Section */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={coinLogos[token]}
                alt={token}
                className="w-12 h-12 rounded-full border border-gray-600"
              />
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0 (optional)"
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none"
              >
                <option value="SOL">SOL</option>
                <option value="ETH">ETH</option>
                <option value="APT">APT</option>
                <option value="EDU">EDU</option>
              </select>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleTradeConfirmation}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-bold transition-transform transform hover:scale-105 mb-4"
            >
              Create Coin
            </button>

            {/* Cost Information */}
            <p className="text-sm text-gray-400 text-center">
              Cost to deploy: ~{(0.02 * 5).toFixed(2)} {token}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
