const Ticket = artifacts.require("./Ticket.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Ticket", (accounts) => {
  let contract;

  before(async () => {
    contract = await Ticket.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "Ticket");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "TICKET");
    });
  });

  describe("minting", async () => {
    it("creates a new token", async () => {
      const result = await contract.mint("Ticket1");
      const totalSupply = await contract.totalSupply();
      // SUCCESS
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 1, "id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      // FAILURE: cannot mint same color twice
      await contract.mint("Ticket1").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("lists tickets", async () => {
      // Mint 3 more tokens
      await contract.mint("Ticket2");
      await contract.mint("Ticket3");
      await contract.mint("Ticket4");
      const totalSupply = await contract.totalSupply();

      let ticket;
      let result = [];

      for (var i = 1; i <= totalSupply; i++) {
        ticket = await contract.tickets(i - 1);
        result.push(ticket);
      }

      let expected = ["Ticket1", "Ticket2", "Ticket3", "Ticket4"];
      assert.equal(result.join(","), expected.join(","));
    });
  });
});
