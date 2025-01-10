require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition/modules");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia: {
      url: "https://sepolia.infura.io/v3/2a685b8c28a84db0a449401356b3dd7b",
      accounts: ["451e52bb9bb124eb97da1e9f9f92af1a13c612bb86c23bce42f921f9f409958b"],
    },
  }
};


