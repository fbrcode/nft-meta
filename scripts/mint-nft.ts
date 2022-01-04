// step 1: You define your variables from .env file
import * as dotenv from "dotenv";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const { 
  ROPSTEN_URL, 
  RINKEBY_URL, 
  PRIVATE_KEY,
  PUBLIC_KEY
} = process.env;

const web3 = createAlchemyWeb3(ROPSTEN_URL || "");

// step 2: Define our contract ABI (Application Binary Interface) & adresses
const contract = require("../artifacts/contracts/MetaNFT.sol/MetaNFT.json");
const contractAddress = "0xc3723e3fefd819cC6b302d3f0D012F02C8EdF5Ab";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

//step 3: Define the minting function
async function mintNFT(tokenURI: string) {

  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY  || "", 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  //step 4: Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY || "");
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction || "");
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);

}

//step 5: Call the mintNFT function
mintNFT("https://rcci6nfn4c.execute-api.us-east-1.amazonaws.com/dev/sensor/nYOtn3yU7zPbLhdI");

// Transaction receipt: 
/*
{
  "transactionHash": "0x32bd6a8cd8fe1fbba629044cd71d72e6aa0347c7d563ae913f3d6983c8c53348",
  "blockHash": "0x54e5804fa6a2fd66da18accd926daff20f81ff5706c033bc34559bd6cf02391e",
  "blockNumber": 11747062,
  "contractAddress": null,
  "cumulativeGasUsed": 372656,
  "effectiveGasPrice": "0x773593fa",
  "from": "0x711110f925771680c8e5c75e69ec051c18d634c5",
  "gasUsed": 190760,
  "logs": [
    {
      "address": "0xc3723e3fefd819cC6b302d3f0D012F02C8EdF5Ab",
      "topics": [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x000000000000000000000000711110f925771680c8e5c75e69ec051c18d634c5",
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ],
      "data": "0x",
      "blockNumber": 11747062,
      "transactionHash": "0x32bd6a8cd8fe1fbba629044cd71d72e6aa0347c7d563ae913f3d6983c8c53348",
      "transactionIndex": 5,
      "blockHash": "0x54e5804fa6a2fd66da18accd926daff20f81ff5706c033bc34559bd6cf02391e",
      "logIndex": 1,
      "removed": false,
      "id": "log_2f12f6b9"
    }
  ],
  "logsBloom": "0x00000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000004000000000008000000000000000000000000000000000000000000000000020000020000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000002000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000002000000000000000000",
  "status": true,
  "to": "0xc3723e3fefd819cc6b302d3f0d012f02c8edf5ab",
  "transactionIndex": 5,
  "type": "0x2"
}
*/
// https://ropsten.etherscan.io/tx/0x32bd6a8cd8fe1fbba629044cd71d72e6aa0347c7d563ae913f3d6983c8c53348
// https://ropsten.etherscan.io/token/0xc3723e3fefd819cC6b302d3f0D012F02C8EdF5Ab?a=0x711110f925771680c8e5c75e69ec051c18d634c5
