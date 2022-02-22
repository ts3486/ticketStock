import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        try {
          //Metamask page should be prompted by user (ex: button click event). "eth_requestAccounts" prompts the browser to provide eth address, and prompts metamask page to appear
          const accounts = await provider.request({ method: "eth_requestAccounts" });
          const account = accounts[0];
          console.log("current account: " + account);
          provider.on("accountsChanged", (accounts) => {
            // Time to reload your interface with accounts[0]!
            console.log("current account: " + accounts[0]);
          });

          resolve(account);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      // else if (window.web3) {
      //   // Use Mist/MetaMask's provider.
      //   const web3 = window.web3;
      //   console.log("Injected web3 detected.");
      //   resolve(web3);
      // }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;

//else { console.log('Please install MetaMask!');}
