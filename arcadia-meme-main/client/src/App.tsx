import React from "react";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { LandingSection } from "./components/landingSection";
import { WalletProvider } from "./components/walletProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateCoin } from "./components/createCoin";
import { TradingPage } from "./components/tradingPage";

const App: React.FC = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-900 text-white press2start-regular">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<LandingSection />} />
            <Route path="/create-coin" element={<CreateCoin />} />
            <Route path="/trade/:ticker" element={<TradingPage />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </WalletProvider>
  );
};

export default App;