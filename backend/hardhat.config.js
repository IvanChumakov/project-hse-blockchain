require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");

const { metamask_private_key, etherscanAPIKey } = require('./secrets.json');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.19",

  networks: {
    sepolia: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      accounts: [metamask_private_key],
    },
  },
  etherscan: {
    apiKey: etherscanAPIKey,
  },
};
