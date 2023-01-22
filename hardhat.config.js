require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: process.env.RPCURL,
            accounts: [process.env.privateKey],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts = [], hardhat placed an account for us here
            chainId: 31337,

        }
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: process.env.etherscanAPI,
    },
    gasReporter : {
        enabled : true,
        outputFile : "gas-report.txt",
        noColors : true,
        currency : "USD",
        coinmarketcap : process.env.COIN_MKT_API,
        token : "BITCOIN",
    }
};
