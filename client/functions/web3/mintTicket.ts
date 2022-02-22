import React, { useState } from "react";
import ethers from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
const Web3 = require("web3");
const web3 = new Web3("wss://rinkeby.infura.io/ws/v3/0f3a6fad96f04d13bbbf4654d9099af7");
const { mnemonic, publicKey, privateKey } = require("../../secret.json");
const { setupLoader } = require("@openzeppelin/contract-loader");

const provider = detectEthereumProvider();

const loader = setupLoader({
  provider, // either a web3 provider or a web3 instance
});

const nftBuild = loader.web3.fromArtifact("TicketNFT");
const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[4].address);
// const contract = new web3.eth.Contract(nftBuild.abi, nftBuild.networks[5777].address); for ganache

export const mintTicket = async (account: string, ticketURI: string) => {
  console.log(contract);

  const [loading, setLoading] = useState(false);
  const baseCost = await contract.methods.cost().call();
  const txnCount = await web3.eth.getTransactionCount(account);
  const nonce = await ethers.utils.hexlify(txnCount);

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: account,
      nonce: nonce,
      to: "0x1EB590B195F9463b19C612BaA6b947622434DdF3",
      value: baseCost,
      gas: 500000,
      data: contract.methods.mintTicket(ticketURI).encodeABI(),
    },
    privateKey
  );

  const createReceipt = await web3.eth
    .sendSignedTransaction(createTransaction.rawTransaction)
    .once("sending", () => {
      console.log("sending...");
      setLoading(true);
      // setOpen(true);
    })
    .once("sent", () => {
      console.log("sent");
    })
    .on("confirmation", (confNumber: any, receipt: any, latestBlockHash: any) => {
      console.log(confNumber, receipt, latestBlockHash);
      setLoading(false);
    })
    .on("error", (error: any) => {
      console.log(error);
    });

  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
};
