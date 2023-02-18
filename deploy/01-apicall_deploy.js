const { network } = require("hardhat")
// const {developmentChains,networkConfig}=require("../helper-hardhat-config")
module.exports=async function({getNamedAccounts,deployments}){
    const{deploy}=deployments
    const {deployer}=await getNamedAccounts()
    const chainId=network.config.chainId;
    console.log(deployer,chainId);
    const api=await deploy("apicall",{
        from:deployer,
        args:[],
        log: true,
        gasLimit: 6500000,
        waitConfirmations : network.config.blockConfirmations || 1,
    })
    // let baseNonce = provider.getTransacrionCount(wallet.getAddress());
    // let nonceOffset = 0;
    // function getNonce() {
    //      return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
    // }
    // let tx0 = { to: a0, value: v0, nonce: getNonce() };
    // wallet.sendTransaction(tx0);
    // let tx1 = { to: a1, value: v1, nonce: getNonce() };
    // wallet.sendTransaction(tx1);
}
   