import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { AUTOVEST_ABI } from "../constants/abi";
import { CONTRACT_ADDRESSES } from "../config";
import { executeOperation } from "../utils/aaUtils";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface SavingsDashboardProps {
  signer: ethers.Signer | undefined;
  aaAddress: string;
}

const SavingsDashboard: React.FC<SavingsDashboardProps> = ({ signer, aaAddress }) => {
  const [balance, setBalance] = useState("0");
  const [yieldEarned, setYieldEarned] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!signer || !aaAddress) return;
      try {
        const provider = new ethers.providers.JsonRpcProvider(NERO_CHAIN_CONFIG.rpcUrl);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESSES.autovestContract,
          AUTOVEST_ABI,
          provider
        );
        const balanceWei = await contract.getBalance(aaAddress);
        const yieldWei = await contract.getYield();
        setBalance(ethers.utils.formatUnits(balanceWei, 6));
        setYieldEarned(ethers.utils.formatUnits(yieldWei, 6));
      } catch (error) {
        toast.error("Failed to fetch savings data");
      }
    };
    fetchData();
  }, [signer, aaAddress]);

  const handleWithdraw = async () => {
    if (!signer) {
      toast.error("Please connect wallet");
      return;
    }
    setIsLoading(true);
    try {
      await executeOperation(
        signer,
        CONTRACT_ADDRESSES.autovestContract,
        AUTOVEST_ABI,
        "withdraw",
        [],
        2 // Use yield for gas (Type 2)
      );
      toast.success("Withdrawal successful!");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-xl font-semibold text-textPrimary mb-4">Your Savings</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-textSecondary">Balance (USDC)</span>
          <span className="font-medium text-textPrimary">{balance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-textSecondary">Yield Earned (USDC)</span>
          <span className="font-medium text-textPrimary">{yieldEarned}</span>
        </div>
        <button
          onClick={handleWithdraw}
          disabled={isLoading || parseFloat(balance) === 0}
          className="w-full px-4 py-2 text-white font-medium rounded-md bg-secondary hover:bg-emerald-700 focus:outline-none disabled:bg-emerald-300"
        >
          {isLoading ? "Processing..." : "Withdraw"}
        </button>
      </div>
    </motion.div>
  );
};

export default SavingsDashboard;