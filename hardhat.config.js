require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("hardhat-watcher");
require("dotenv/config");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
      chainId: 31337,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 3,
      live: true,
      saveDeployments: true,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 42,
      live: true,
      saveDeployments: true,
    },
    mumbai: {
      chainId: 80001,
      //url: "https://rpc-mumbai.matic.today",
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHE_KEY}`,
      accounts: [
        `0x${process.env.MUMBAI_PRIV}`,
        `0x${process.env.MUMBAI_PRIV2}`,
      ],
      live: true,
      saveDeployments: true,
    },
    polygon: {
      chainId: 137,
      url: "https://rpc-mainnet.maticvigil.com",
      live: true,
      saveDeployments: true,
    },
    ethereum: {
      chainId: 1,
      url: "https://main-rpc.linkpool.io",
      live: true,
      saveDeployments: true,
    },
    binance: {
      chainId: 57,
      url: "https://bscrpc.com",
      live: true,
      saveDeployments: true,
    },
    bsctest: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      live: true,
      saveDeployments: true,
    },
  },
};
