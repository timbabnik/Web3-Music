require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/FRb74Y_n6MGovvwsUX1yc3-baC3Lb9iT",
      accounts: ["750340a0434805be897250489e813fa4ada53c2eff8b13f0a9f6888a5c4cfc41"],
    },
    baseSepolia: {
      url: "https://base-sepolia.g.alchemy.com/v2/FRb74Y_n6MGovvwsUX1yc3-baC3Lb9iT",
      accounts: [process.env.PRIVATE_KEY],
    },
    base: {
      url: "https://base-mainnet.g.alchemy.com/v2/FRb74Y_n6MGovvwsUX1yc3-baC3Lb9iT",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: { 
    apiKey: {
      sepolia: [process.env.SEPOLIA],
      base: [process.env.BASE],
    }
  },
  solidity: "0.8.20",
};
