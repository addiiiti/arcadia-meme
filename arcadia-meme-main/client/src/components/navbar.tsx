import { useState, useEffect } from "react";
import { Wallet, ChevronDown, ExternalLink } from "lucide-react";
import { useWallet } from "./walletProvider";

// WalletPopup Component
export const WalletPopup: React.FC<{
  walletAddress: string | null;
  isLoggedIn: boolean;
}> = ({ walletAddress, isLoggedIn }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("walletPopupDismissed") && !walletAddress && !isLoggedIn) {
      setShowPopup(true);
    }
  }, [walletAddress, isLoggedIn]);

  const handleDismiss = () => {
    setShowPopup(false);
    sessionStorage.setItem("walletPopupDismissed", "true");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white border-4 border-yellow-400 p-6 rounded-lg text-center pixel-font max-w-sm shadow-lg z-50">
      <h2 className="text-2xl text-yellow-400 mb-4">Wallet Not Connected</h2>
      <p className="mb-6 text-sm">
        Please connect your wallet to start trading memecoins.
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 border-2 border-gray-900 rounded hover:bg-yellow-300 transition-transform transform hover:scale-105"
          onClick={() => window.open("https://petra.app", "_blank")}
        >
          Install Petra
        </button>
        <button
          className="bg-yellow-400 text-gray-900 font-bold px-4 py-2 border-2 border-gray-900 rounded hover:bg-yellow-300 transition-transform transform hover:scale-105"
          onClick={() => window.open("https://martianwallet.xyz", "_blank")}
        >
          Install Martian
        </button>
      </div>
      <button
        className="mt-4 text-sm text-gray-400 underline hover:text-white"
        onClick={handleDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

// GuidelinesPopup Component
export const GuidelinesPopup: React.FC = () => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("hasSeenGuidelines")) {
      setShowGuidelines(true);
    }
  }, []);

  const handleDismiss = () => {
    setShowGuidelines(false);
    localStorage.setItem("hasSeenGuidelines", "true");
  };

  if (!showGuidelines) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-purple-800 text-white border-4 border-chart-cyan p-6 rounded-lg text-center pixel-font max-w-sm shadow-lg z-50">
      <h2 className="text-2xl text-chart-cyan mb-4">Guidelines</h2>
      <p className="mb-6 text-sm">
        Follow these steps to ensure a safe trading experience:
        <br />
        1. Choose a memecoin to trade.
        <br />
        2. Monitor bonding curves carefully.
        <br />
        3. Always double-check fees.
      </p>
      <button
        className="bg-chart-cyan text-gray-900 font-bold px-4 py-2 border-2 border-gray-900 rounded hover:bg-gray-300 transition-transform transform hover:scale-105"
        onClick={handleDismiss}
      >
        Got it!
      </button>
    </div>
  );
};

// Navbar Component
export const Navbar: React.FC = () => {
  const {
    walletAddress,
    walletProvider,
    isConnecting,
    connectWallet,
    disconnect,
    error,
  } = useWallet();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleWalletConnect = async (provider: string) => {
    try {
      await connectWallet(provider);
      setShowWalletDropdown(false);
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      setIsLoggedIn(true);
    }
  }, [walletAddress]);

  return (
    <>
      <WalletPopup walletAddress={walletAddress} isLoggedIn={isLoggedIn} />
      <GuidelinesPopup />

      <nav className="bg-arcade-black text-meme-green px-6 py-4 flex justify-between items-center border-b border-chart-cyan/30">
        <div className="flex items-center">
          <img className="w-12 h-12" src="/arcadia-meme-logo.png" alt="logo" />
          <a
            href="/"
            className="ml-2 text-2xl font-bold bg-gradient-to-r from-yellow-500 via-emerald-400 to-yellow-500 bg-clip-text text-transparent"
          >
            arcadia-meme
          </a>
        </div>

        <div className="relative">
          {!window.aptos && !window.martian ? (
            <button
              className="bg-pump-purple hover:bg-chart-cyan text-coin-gold text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
              onClick={() => window.open("https://petra.app", "_blank")}
            >
              <Wallet className="w-4 h-4" /> Install Wallet{" "}
              <ExternalLink className="w-4 h-4" />
            </button>
          ) : walletAddress ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                className="bg-pump-purple hover:bg-chart-cyan text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                {formatAddress(walletAddress)}
                <ChevronDown className="w-4 h-4" />
              </button>
              {showWalletDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-arcade-black border border-chart-cyan/30 rounded-lg shadow-xl z-20">
                  <div className="py-2 px-4">
                    <p className="text-xs text-meme-green/70">Connected to {walletProvider}</p>
                    <p className="text-xs text-meme-green/50 break-all">{walletAddress}</p>
                  </div>
                  <button
                    onClick={disconnect}
                    className="w-full px-4 py-2 text-left text-crash-red hover:text-white"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-pump-purple hover:bg-chart-cyan text-white text-sm px-4 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
              onClick={() => setShowWalletDropdown(!showWalletDropdown)}
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
          {showWalletDropdown && !walletAddress && (
            <div className="absolute right-0 mt-10 w-48 bg-arcade-black border border-chart-cyan/30 rounded-lg shadow-xl z-10">
              <div className="py-1">
                {window.aptos && (
                  <button
                    className="w-full px-4 py-2 text-left text-meme-green/70 hover:text-white hover:bg-crash-red/20 transition-colors flex items-center gap-2"
                    onClick={() => handleWalletConnect("Petra")}
                  >
                    <img
                      src="/petra-wallet.png"
                      alt="Petra Wallet"
                      className="w-4 h-4"
                    />
                    Petra Wallet
                  </button>
                )}
                {window.martian && (
                  <button
                    className="w-full px-4 py-2 text-left text-meme-green/70 hover:text-white hover:bg-crash-red/20 transition-colors flex items-center gap-2"
                    onClick={() => handleWalletConnect("Martian")}
                  >
                    <img
                      src="/martian-wallet-icon.avif"
                      alt="Martian Wallet"
                      className="w-4 h-4"
                    />
                    Martian Wallet
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-crash-red text-white px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </nav>
    </>
  );
};