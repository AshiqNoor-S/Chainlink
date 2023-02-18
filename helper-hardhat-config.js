const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        name: "localhost",
        entranceFee:ethers.utils.parseEther("0.01"),
        gaslane:"0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    5: {
        name: "goerli",
        VRFCoordinator: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entranceFee: ethers.utils.parseEther("0.01"),
        gaslane:"0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId:"588",
        callbackgas:"500000",
        interval:"30",
    },
    
}

const developmentChains = ["hardhat", "localhost"] // to specify local network to work on mock contracts

module.exports = {
    networkConfig,
    developmentChains,
}
