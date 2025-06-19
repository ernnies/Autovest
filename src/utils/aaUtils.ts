import { ethers } from "ethers";
import { Presets, UserOperationBuilder } from "userop";
import {
  NERO_CHAIN_CONFIG,
  AA_PLATFORM_CONFIG,
  CONTRACT_ADDRESSES,
  API_KEY,
} from "../config";

export const getSigner = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
};

export const getAAWalletAddress = async (signer: ethers.Signer) => {
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    signer,
    NERO_CHAIN_CONFIG.rpcUrl,
    {
      overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
      entryPoint: CONTRACT_ADDRESSES.entryPoint,
      factory: CONTRACT_ADDRESSES.accountFactory,
    }
  );
  return simpleAccount.getSender();
};

export const initAAClient = async (signer: ethers.Signer) => {
  // Implement client initialization (e.g., using userop.js)
  return {};
};

export const initAABuilder = async (signer: ethers.Signer, apiKey?: string) => {
  const builder = await Presets.Builder.SimpleAccount.init(
    signer,
    NERO_CHAIN_CONFIG.rpcUrl,
    {
      overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
      entryPoint: CONTRACT_ADDRESSES.entryPoint,
      factory: CONTRACT_ADDRESSES.accountFactory,
    }
  );
  builder.setPaymasterOptions({
    apikey: apiKey || API_KEY,
    rpc: AA_PLATFORM_CONFIG.paymasterRpc,
    type: "0",
  });
  builder.setCallGasLimit(300000);
  builder.setVerificationGasLimit(2000000);
  builder.setPreVerificationGas(100000);
  return builder;
};

export const getSupportedTokens = async (client: any, builder: any) => {
  try {
    const sender = await builder.getSender();
    const minimalUserOp = {
      sender,
      nonce: "0x0",
      initCode: "0x",
      callData: "0x",
      callGasLimit: "0x88b8",
      verificationGasLimit: "0x33450",
      preVerificationGas: "0xc350",
      maxFeePerGas: "0x2162553062",
      maxPriorityFeePerGas: "0x40dbcf36",
      paymasterAndData: "0x",
      signature: "0x",
    };
    const provider = new ethers.providers.JsonRpcProvider(AA_PLATFORM_CONFIG.paymasterRpc);
    let tokensResponse;
    try {
      tokensResponse = await provider.send("pm_supported_tokens", [
        minimalUserOp,
        API_KEY,
        CONTRACT_ADDRESSES.entryPoint,
      ]);
    } catch {
      tokensResponse = await provider.send("pm_supported_tokens", [
        { userOp: minimalUserOp, entryPoint: CONTRACT_ADDRESSES.entryPoint, apiKey: API_KEY },
      ]);
    }
    const tokens = tokensResponse.tokens || tokensResponse;
    return tokens.map((token: any) => ({
      address: token.token || token.address,
      decimal: parseInt(token.decimal || "18"),
      symbol: token.symbol,
      type: token.type || (token.prepay ? 1 : token.postpay ? 2 : 0),
      prepay: token.prepay === true,
      postpay: token.postpay === true,
      freepay: token.freepay === true,
    }));
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
};

export const executeOperation = async (
  signer: ethers.Signer,
  contractAddress: string,
  contractAbi: any,
  functionName: string,
  functionParams: any[],
  paymentType: number = 0,
  selectedToken: string = ""
) => {
  const client = await initAAClient(signer);
  const builder = await initAABuilder(signer);
  if (paymentType > 0 && selectedToken) {
    builder.setPaymasterOptions({
      apikey: API_KEY,
      rpc: AA_PLATFORM_CONFIG.paymasterRpc,
      type: paymentType.toString(),
      token: selectedToken,
    });
  } else {
    builder.setPaymasterOptions({
      apikey: API_KEY,
      rpc: AA_PLATFORM_CONFIG.paymasterRpc,
      type: paymentType.toString(),
    });
  }
  const contract = new ethers.Contract(contractAddress, contractAbi, ethers.getDefaultProvider());
  const callData = contract.interface.encodeFunctionData(functionName, functionParams);
  const userOp = await builder.execute(contractAddress, 0, callData);
  const res = await client.sendUserOperation(userOp);
  const receipt = await res.wait();
  return {
    userOpHash: res.userOpHash,
    transactionHash: receipt?.transactionHash || "",
    receipt,
  };
};