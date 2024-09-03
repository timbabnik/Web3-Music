require("@nomicfoundation/hardhat-toolbox");

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
  },
  etherscan: { 
    apiKey: "SBD2A2QEPXEU741RH2EGDI5F77R5M1PDJ7"
  },
  solidity: "0.8.20",
};
