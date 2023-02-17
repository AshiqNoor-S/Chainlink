const Web3 = require('web3');
const { ethers,network } = require("hardhat")
const MyContract = require('./deployments/goerli/apicall.json');
const address = '0x35891d4E470552d80fBFA818c40a3a09B4EF13dF';
const privateKey = 'a107ae658f84425805bb1e931f3e1376d5589b7b1cded08792c8fc482316b2f8';
const infuraUrl = 'https://goerli.infura.io/v3/c6312cd7e09149d684ff4e508d97c51a'; 
const init1=async()=>{
    const web3=new Web3(infuraUrl);
    const networkid=await web3.eth.net.getId(); //to obtain network id
    const contract=new web3.eth.Contract( //to import abi,addrsss of the compiled contract
        MyContract.abi,
        // MyContract.networks[5].address
    );
    const tx=contract.methods.setData(1); //to create a transaction object
    const gas=await tx.estimateGas({from:address});
    const gasprice=await web3.eth.getGasPrice();
    const data=tx.encodeABI(); //abi of the function call
    const nonce=await web3.eth.gettransactionCount(address); //to ensure the nonce get updated each time
    const signedTx=await web3.eth.accounts.signTransaction({
        to: contract.options.address,
        data,
        gas,
        gasprice,
        nonce,
        chainId:networkid
    },
       privateKey
    );
    console.log("Old data= %d",await contract.methods.data().call());
    const reciept=await web3.eth.sendSignedTransaction(signedTx.rawTransaction); //signing my transaction
    console.log("Transaction hash=",reciept.transactionHash);
    console.log("New data= %d",await contract.methods.data().call());
}
init1();