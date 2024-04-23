require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/aye1VHc7yUUefRxwD4rmVDV-mR2puNyn",
      accounts: ["82f0cb48d24eeb906f406cb820db784eb94a0f905a53b4e53f317755ac83107a"],
    },
  },
};
