require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
module.exports = {
  solidity: {
    compilers:[
      {
        version:"0.8.28"
      },
      {
        version:"0.8.20",
      }
    ]
  }
};
