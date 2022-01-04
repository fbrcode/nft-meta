import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }

});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { 
  ROPSTEN_URL, 
  RINKEBY_URL, 
  PRIVATE_KEY, 
  ETHERSCAN_API_KEY, 
  REPORT_GAS,
  DEBUG
} = process.env;

const config: HardhatUserConfig = {
  //defaultNetwork: "ropsten",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: DEBUG ? false : true,
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: '1000000000000000000000000',
        count: 5,
      },
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
    },
    ropsten: {
      url: ROPSTEN_URL || "",
      accounts:
        PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: RINKEBY_URL || "",
      accounts:
        PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
