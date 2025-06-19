import React, { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletConnect from "./components/WalletConnect";
import SavingsForm from "./components/SavingsForm";
import SavingsDashboard from "./components/SavingsDashboard";
import { motion } from "framer-motion";

const App: React.FC = () => {
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [eoaAddress, setEoaAddress] = useState("");
  const [aaAddress, setAaAddress] = useState("");

  const handleWalletConnected = (eoaAddr: string, aaAddr: string, walletSigner: ethers.Signer) => {
    setEoaAddress(eoaAddr);
    setAaAddress(aaAddr);
    setSigner(walletSigner);
    toast.success("Wallet connected!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-textPrimary">Autovest</h1>
        <p className="text-textSecondary mt-2">Your Web3 Piggy Bank for Auto-Savings</p>
      </motion.div>
      {!signer ? (
        <WalletConnect onWalletConnected={handleWalletConnected} />
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <SavingsForm signer={signer} aaAddress={aaAddress} />
          <SavingsDashboard signer={signer} aaAddress={aaAddress} />
        </div>
      )}
    </div>
  );
};

export default App;