export const NERO_CHAIN_CONFIG = {
  rpcUrl: "https://rpc-testnet.nerochain.io",
  chainId: 689,
  currencySymbol: "NERO",
  blockExplorerUrl: "https://testnet.neroscan.io",
};

export const AA_PLATFORM_CONFIG = {
  bundlerRpc: "https://bundler-testnet.nerochain.io",
  paymasterRpc: "https://paymaster-testnet.nerochain.io",
};

export const CONTRACT_ADDRESSES = {
  entryPoint: "0xYourEntryPointAddress",
  accountFactory: "0xYourAccountFactoryAddress",
  autovestContract: "0xYourAutovestContractAddress", // To be updated after deployment
};

export const API_KEY = process.env.REACT_APP_PAYMASTER_API_KEY || "";