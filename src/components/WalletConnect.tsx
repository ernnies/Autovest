import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getSigner, getAAWalletAddress } from "../utils/aaUtils";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface WalletConnectProps {
  onWalletConnected: (eoaAddress: string, aaAddress: string, signer: ethers.Signer) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          await connectWallet();
        }
      }
    };
    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
        } else {
          connectWallet();
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const signer = await getSigner();
      const eoaAddress = await signer.getAddress();
      const aaAddress = await getAAWalletAddress(signer);
      setIsConnected(true);
      onWalletConnected(eoaAddress, aaAddress, signer);
      toast.success("Wallet connected successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
      toast.error("Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <button
        onClick={connectWallet}
        disabled={isLoading || isConnected}
        className={`px-6 py-3 rounded-lg font-semibold text-white ${
          isConnected ? "bg-green-500" : "bg-primary hover:bg-indigo-700"
        } disabled:opacity-50`}
      >
        {isLoading ? "Connecting..." : isConnected ? "Connected" : "Connect Wallet"}
      </button>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </motion.div>
  );
};

export default WalletConnect;