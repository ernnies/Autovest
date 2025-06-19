# Autovest: Your Web3 Piggy Bank 🚀

Welcome to **Autovest**, a decentralized application (dApp) built on **NERO Chain** that reimagines savings as a seamless, rewarding journey. Autovest is your Web3 piggy bank—automating stablecoin deposits, earning low-risk DeFi yields, and removing the friction of gas fees through NERO’s **Paymaster**. Autovest delivers simplicity, accessibility, and fun to onboard the next billion Web3 users.

---

## What It Does

- **Automates Savings**: Schedule weekly or monthly stablecoin (e.g., USDC) deposits into a smart contract.
- **Earns Yields**: Leverages low-risk DeFi strategies on NERO Chain for passive growth.
- **Gasless Experience**: Uses NERO’s Paymaster to sponsor gas fees (Type 1: prepay, Type 2: yield-based).
- **User-Friendly UI**: Modern design with animations, social login, and real-time dashboards.

---

## The Problem It Solves

Web3 savings are often inaccessible due to:
- **High gas fees** ➜ Autovest eliminates them via Paymaster.
- **Complex UX** ➜ Streamlined UI supports social logins and easy deposits.
- **Inconsistent saving habits** ➜ Encourages automated micro-savings with yield rewards.

---

## Challenges We Ran Into

- **Paymaster Integration**: Multi-type gas sponsorship required deep debugging.
- **UI Responsiveness**: Framer Motion had to be optimized across devices.
- **DeFi Yield Feeds**: Mockups were needed due to the lack of real-time data.

---

## Technologies We Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Blockchain**: Ethers.js, NERO Chain (Testnet), Paymaster, Account Abstraction
- **Authentication**: `@web3auth/base` for social login
- **Notifications**: `react-toastify` for in-app alerts
- **Tooling**: Create React App, npm

---

## How We Built It

1. **Setup**: Initialized a React TypeScript app with `create-react-app`.
2. **Design**: Built a vibrant UI using Tailwind CSS (`indigo/emerald`) + Framer Motion animations.
3. **Blockchain Integration**: Connected to NERO Chain with Ethers.js and integrated Paymaster.
4. **Components**: Developed `WalletConnect`, `SavingsForm`, `PaymentTypeSelector`, and `SavingsDashboard`.
5. **Testing**: Deployed on NERO Testnet using MetaMask and iterated on user feedback.

---

## What We Learned

- Simplicity is key for onboarding non-Web3 users.
- Account Abstraction on NERO unlocks gasless UX but requires solid error handling.
- Animations improve UX—when lightweight and responsive.
- Community feedback shapes core features like savings visualization.

---

## Getting Started

### Prerequisites

- Node.js (v16.x or v18.x recommended)
- npm (v8.x or v9.x)
- MetaMask wallet connected to NERO Chain Testnet  
  > RPC: `https://rpc-testnet.nerochain.io`, Chain ID: `689`
- NERO testnet tokens (via [NERO Faucet](https://faucet.nerochain.io))

### Installation

```bash
git clone https://github.com/ernnies/Autovest.git
cd autovest
npm install
npm install tailwindcss@4.1.10 @tailwindcss/forms@0.5.10 framer-motion ethers @web3auth/base react-toastify --legacy-peer-deps
````

### Tailwind CSS Initialization

```bash
./node_modules/.bin/tailwindcss init -p
```

> If the CLI fails, manually create `tailwind.config.js` and `postcss.config.js` (see Troubleshooting).

### Environment Variables

Create a `.env` file in the root:

```env
REACT_APP_PAYMASTER_API_KEY=your_api_key
```

Replace `your_api_key` with your actual NERO Paymaster key.

### Start the App

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Connect MetaMask to NERO Testnet.
2. Set auto-deposit intervals in the **SavingsForm**.
3. Choose your gas payment type (prepay or yield-based).
4. Track growth on the **SavingsDashboard**.
5. Withdraw when you’re ready!

---

## Troubleshooting

* **Tailwind CLI Error**: If `tailwindcss init -p` fails, create `tailwind.config.js` and `postcss.config.js` manually.
* **Security Warnings**: Run `npm audit fix` or `npm audit fix --force` to address vulnerabilities.
* **Node Compatibility**: Use `nvm` to switch Node versions if needed (Node 18.x recommended).

---

## 🌍 What’s Next for Autovest?

* **Wave 6**: Gamified savings (Piggy Points), SocialFi leaderboards, NFT skin customization.
* **Wave 7**: Yield optimization engine, cross-chain bridge (Ethereum/BNB), AI-powered advisor.
* **Future**: Mobile app, strategy marketplace, and NERO Chain ecosystem integrations.

---

## Contributing

We welcome contributions!

```bash
# Fork the repo
# Create your feature branch: git checkout -b feature/YourFeature
# Commit your changes: git commit -m "Add YourFeature"
# Push to the branch: git push origin feature/YourFeature
# Open a pull request
```

## License

MIT License – free to use, modify, and distribute.

---

## Acknowledgments

* **NERO Chain Team** for enabling innovation with Blockspace 2.0 and AA Paymasters.
* **Web3 Community** for feedback, feature ideas, and support throughout the Buildathon.

---

> 🐷💸 Happy Hacking with Autovest!
