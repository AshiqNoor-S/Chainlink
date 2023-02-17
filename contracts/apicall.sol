//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "hardhat/console.sol";
error fundme_notOwner();
contract apicall is ChainlinkClient, ConfirmedOwner(0x35891d4E470552d80fBFA818c40a3a09B4EF13dF){
    using Chainlink for Chainlink.Request;

  
    uint256 public volume;
    address private immutable owner1;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
   

    modifier onlyOwner1(){
        // if the condition should be checked before reading the function
        if (msg.sender == owner1) revert fundme_notOwner() ;
        // revert notOwner() ;
        _;
    }
    
    constructor() public payable {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB); 
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7); 
        // oracle =0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 ;
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
        owner1=msg.sender;
    }
    
    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        request.add("get", "https://reqres.in/api/products/3");
        request.add("path", "data.id");// according to the jason file
        // request.addInt("times",10);
        return sendChainlinkRequestTo(oracle, request, fee);

    }

    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
        console.log("value",volume);
    }
   

    function withdrawLink() public onlyOwner1 { 
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress()); 
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer'); 
    } 

 
}