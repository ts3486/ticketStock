require("dotenv").config();
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
import { ethers } from "ethers";
// const API_URL = process.env.API_URL;
// const PUBLIC_KEY = process.env.PUBLIC_KEY;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

const nftBuild = require("../build/contracts/TicketNFT.json");
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address);

const buyer = "";
const gas = 450000;

module.exports = async (callback) => {
  const tokenId = await contract._tokenIds.call(`https://gateway.pinata.cloud/ipfs/${ticketCid}`);

  const seller = await contract.methods.checkowner(tokenId).call();
  const baseCost = await contract.methods.cost().call();
  const txnCount = await web3.eth.getTransactionCount(buyer);
  const nonce = await ethers.utils.hexlify(txnCount);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: buyer,
      nonce: nonce,
      //change on new contract deployment.
      to: "0x1EB590B195F9463b19C612BaA6b947622434DdF3",
      value: baseCost,
      gas: 500000,
      data: contract.methods._transferFrom(seller, buyer, tokenId).encodeABI(),
    },
    privateKey
  );

  const createReceipt = await web3.eth
    .sendSignedTransaction(createTransaction.rawTransaction)
    .once("sending", () => {
      console.log("sending...");
      // setLoading(true);
      // setOpen(true);
    })
    .once("sent", () => {
      console.log("sent");
    })
    .on("confirmation", (confNumber: any, receipt: any, latestBlockHash: any) => {
      console.log(confNumber, receipt, latestBlockHash);
      // setLoading(false);
    })
    .on("error", (error: any) => {
      console.log(error);
    });

  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);

  callback().catch(callback);
};
