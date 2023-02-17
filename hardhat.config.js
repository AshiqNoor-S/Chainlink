/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY 
    // "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY 

module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
          url: GOERLI_RPC_URL,
          accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
          //   accounts: {
          //     mnemonic: MNEMONIC,
          //   },
          saveDeployments: true,
          chainId: 5,
          allowUnlimitedContractSize: true,
          // gas: 2100000,
          // gasPrice: 8000000000,
          // gasLimit:800000000,
      },
    },
      //   goerli: {
      //       url: GOERLI_RPC_URL,
      //       accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      //       //   accounts: {
      //       //     mnemonic: MNEMONIC,
      //       //   },
      //       saveDeployments: true,
      //       chainId: 5,
      //       allowUnlimitedContractSize: true,
      //       // gas: 2100000,
      //       // gasPrice: 8000000000,
      //       // gasLimit:800000000,
      //   },
      // },
      etherscan: {
        apiKey: {
          goerli: ETHERSCAN_API_KEY
        }
      },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      },
  },
}
