const { configDotenv } = require("dotenv");

require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

configDotenv();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.28",
      },
      {
        version: "0.8.20",
      },
    ],
  },
  networks: {
    baseSepolia: {
      url: `https://base-sepolia.g.alchemy.com/v2/${process.env.API}`, 
      accounts: [`0x${process.env.PRIVATE_KEY}`], 
    },
  },
  etherscan: {
    apiKey: process.env.BASE_API, 
  },
};
