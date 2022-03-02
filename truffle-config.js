require("dotenv").config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const projectID = process.env.PROJECT_ID;

const RinkebyProvider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${projectID}`);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "build/contracts"),
  networks: {
    develop: {
      // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    rinkeby: {
      // from: "0x4bcFa9287e80138B1705f03bd12C83d775c58ab1",
      provider: RinkebyProvider,
      network_id: 4,
      gas: 10000000,
      gasPrice: 25000000000,
    },
  },

  compilers: {
    solc: {
      version: "^0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200,
      },
      //  evmVersion: "byzantium"
      // }
    },
  },

  plugins: ["truffle-plugin-verify"],

  // api_keys: {
  //   etherscan: apiKey,
  // },
};
