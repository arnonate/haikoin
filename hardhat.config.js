require("dotenv").config();
require("@nomiclabs/hardhat-waffle");

// const privateKey = process.env.PRIVATE_KEY;
// const privateKey = "7ff8f8dd90c0976615481f0ba46e18cc54e39b43";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/v1/7ff8f8dd90c0976615481f0ba46e18cc54e39b43",
      // accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
