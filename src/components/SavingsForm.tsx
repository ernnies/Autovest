import React, { useState } from "react";
import { ethers } from "ethers";
import { executeOperation } from "../utils/aaUtils";
import { AUTOVEST_ABI } from "../constants/abi";
import { CONTRACT_ADDRESSES } from "../config";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import PaymentTypeSelector from "./PaymentTypeSelector";

interface SavingsFormProps {
  signer: ethers.Signer | undefined;
  aaAddress: string;
}

const SavingsForm: React.FC<SavingsFormProps> = ({ signer, aaAddress }) => {
  const [amount, setAmount] = useState("");
  const [interval, setInterval] = useState("weekly");
  const [paymentType, setPaymentType] = useState(0);
  const [selectedToken, setSelectedToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer || !amount) {
      toast.error("Please connect wallet and enter an amount");
      return;
    }

    setIsLoading(true);
    try {
      const amountWei = ethers.utils.parseUnits(amount, 6); // Assuming USDC (6 decimals)
      const intervalSeconds = interval === "weekly" ? 7 * 24 * 60 * 60 : 30 * 24 * 60 * 60;

      await executeOperation(
        signer,
        CONTRACT_ADDRESSES.autovestContract,
        AUTOVEST_ABI,
        "setAutoDeposit",
        [amountWei, intervalSeconds],
        paymentType,
        selectedToken
      );

      toast.success("Auto-deposit set successfully!");
      setAmount("");
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
      <h2 className="text-xl font-semibold text-textPrimary mb-4">Set Up Auto-Savings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textSecondary">Amount (USDC)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            placeholder="10.00"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textSecondary">Interval</label>
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <PaymentTypeSelector
          onSelectPaymentType={setPaymentType}
          onSelectToken={setSelectedToken}
          signer={signer}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 text-white font-medium rounded-md bg-primary hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300"
        >
          {isLoading ? "Processing..." : "Set Auto-Deposit"}
        </button>
      </form>
    </motion.div>
  );
};

export default SavingsForm;