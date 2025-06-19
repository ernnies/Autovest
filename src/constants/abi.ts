export const AUTOVEST_ABI = [
  "function deposit(uint256 amount) external",
  "function setAutoDeposit(uint256 amount, uint256 interval) external",
  "function withdraw() external",
  "function getBalance(address user) external view returns (uint256)",
  "function getYield() external view returns (uint256)",
];