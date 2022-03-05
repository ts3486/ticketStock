import React, { useState } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
const { mnemonic, publicKey, privateKey, projectId } = require("../../secret.json");
const Web3 = require("web3");
// const web3 = new Web3(`wss://rinkeby.infura.io/ws/v3/${projectId}`);
const web3 = new Web3("http://localhost:7545");
const nftBuild = require("../../../build/contracts/TicketNFT.json");
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address);
// for rinkeby
// const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[4].address);

export const transferTicket = async (buyer: string, tokenId: number) => {
  // const tokenURI = `https://gateway.pinata.cloud/ipfs/${ticketCid}`;

  // const tokenId = await contract.methods.tokenIds(tokenURI).call();

  console.log(buyer, tokenId);

  const seller = await contract.methods.checkOwner(tokenId).call();
  console.log(buyer, seller);
  const baseCost = await contract.methods.cost().call();
  const txnCount = await web3.eth.getTransactionCount(buyer);
  const nonce = await ethers.utils.hexlify(txnCount);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: buyer,
      nonce: nonce,
      //change on new contract deployment.
      //   0x162205217344115d92A5339A27C9795f49B5Ce17
      to: contract,
      value: baseCost,
      gas: 100000,
      gasPrice: 2500000,
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
    })
    .on("error", (error: any) => {
      console.log(error);
    });

  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);

  return createReceipt;
};
