import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getSupportedTokens } from "../utils/aaUtils";
import { toast } from "react-toastify";

interface PaymentTypeSelectorProps {
  onSelectPaymentType: (type: number) => void;
  onSelectToken: (token: string) => void;
  signer: ethers.Signer | undefined;
}

const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({
  onSelectPaymentType,
  onSelectToken,
  signer,
}) => {
  const [paymentType, setPaymentType] = useState(0);
  const [supportedTokens, setSupportedTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState("");

  useEffect(() => {
    const fetchTokens = async () => {
      if (!signer) return;
      try {
        const builder = await initAABuilder(signer);
        const client = await initAAClient(signer);
        const tokens = await getSupportedTokens(client, builder);
        setSupportedTokens(tokens);
      } catch (error) {
        toast.error("Failed to fetch supported tokens");
      }
    };
    fetchTokens();
  }, [signer]);

  const handlePaymentTypeChange = (type: number) => {
    setPaymentType(type);
    onSelectPaymentType(type);
    setSelectedToken("");
    onSelectToken("");
  };

  const filteredTokens = supportedTokens.filter(
    (token) => token.type === paymentType || (paymentType === 1 && token.prepay) || (paymentType === 2 && token.postpay)
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-textSecondary">Gas Payment Method</label>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => handlePaymentTypeChange(0)}
          className={`px-3 py-1 rounded-md text-sm ${paymentType === 0 ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          Sponsored
        </button>
        <button
          type="button"
          onClick={() => handlePaymentTypeChange(1)}
          className={`px-3 py-1 rounded-md text-sm ${paymentType === 1 ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          Prepay
        </button>
        <button
          type="button"
          onClick={() => handlePaymentTypeChange(2)}
          className={`px-3 py-1 rounded-md text-sm ${paymentType === 2 ? "bg-primary text-white" : "bg-gray-200"}`}
        >
          Pay with Yield
        </button>
      </div>
      {paymentType > 0 && (
        <select
          value={selectedToken}
          onChange={(e) => {
            setSelectedToken(e.target.value);
            onSelectToken(e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        >
          <option value="">Select Token</option>
          {filteredTokens.map((token) => (
            <option key={token.address} value={token.address}>
              {token.symbol}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PaymentTypeSelector;