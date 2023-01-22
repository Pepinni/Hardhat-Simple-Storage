require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: process.env.RPCURL,
            accounts: [process.env.privateKey],
            chainId: 5,
        },
    },
    solidity: "0.8.17",
    etherscan: {
        apiKey: process.env.etherscanAPI,
    }
};
